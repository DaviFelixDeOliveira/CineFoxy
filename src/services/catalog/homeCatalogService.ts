import { buildCatalogProxyPath, mapProxyHttpError } from '@/services/http/catalogProxyContract';
import type { CatalogProxyQuery } from '@/services/http/catalogProxyContract';
import type { MediaItem } from '@/types/media';

interface TmdbGenre { id: number; name: string }
interface TmdbResult {
  id: number;
  title?: string;
  name?: string;
  overview?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
  genre_ids?: number[];
  media_type?: 'movie' | 'tv';
}
interface TmdbListResponse { results?: TmdbResult[] }
interface TmdbGenreResponse { genres?: TmdbGenre[] }
interface ProxyResponse<T> {
  ok: boolean;
  data?: T;
  error?: { code: string; message: string; canRetry: boolean };
}

export class CatalogRequestError extends Error {
  readonly appError;
  constructor(appError: ReturnType<typeof mapProxyHttpError>) {
    super(appError.userMessage);
    this.name = 'CatalogRequestError';
    this.appError = appError;
  }
}

const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

async function requestCatalog<T>(query: CatalogProxyQuery): Promise<T> {
  const response = await fetch(buildCatalogProxyPath(query), {
    method: 'GET',
    headers: { Accept: 'application/json' }
  });
  const payload = await response.json() as ProxyResponse<T>;
  if (!response.ok || !payload.ok || payload.data === undefined) {
    throw new CatalogRequestError(mapProxyHttpError(response.status, payload as never));
  }
  return payload.data;
}

function mapResults(results: TmdbResult[], genres: Map<number, string>, forcedType?: 'movie' | 'series'): MediaItem[] {
  return (results || []).map((item) => {
    const type = forcedType || (item.media_type === 'tv' || (!item.title && item.name) ? 'series' : 'movie');
    const date = type === 'series' ? item.first_air_date : item.release_date;
    return {
      id: `${type}-${item.id}`,
      title: item.title || item.name || 'Título sem nome',
      overview: item.overview || '',
      posterUrl: item.poster_path ? `${IMAGE_BASE}${item.poster_path}` : '',
      backdropUrl: item.backdrop_path ? `https://image.tmdb.org/t/p/w1280${item.backdrop_path}` : undefined,
      type,
      releaseYear: date ? Number(date.slice(0, 4)) : undefined,
      rating: typeof item.vote_average === 'number' ? Number(item.vote_average.toFixed(1)) : undefined,
      genres: (item.genre_ids || []).map((id) => genres.get(id)).filter((name): name is string => Boolean(name))
    };
  });
}

export async function fetchHomeCatalog(): Promise<{
  trending: MediaItem[];
  recent: MediaItem[];
  topRated: MediaItem[];
  series: MediaItem[];
}> {
  const [trendingData, recentData, topData, seriesData, movieGenres, seriesGenres] = await Promise.all([
    requestCatalog<TmdbListResponse>({ action: 'trending', type: 'all', language: 'pt-BR' }),
    requestCatalog<TmdbListResponse>({ action: 'discover', type: 'movie', language: 'pt-BR', sort_by: 'primary_release_date.desc', date_lte: new Date().toISOString().slice(0, 10), vote_count_gte: 10 }),
    requestCatalog<TmdbListResponse>({ action: 'discover', type: 'movie', language: 'pt-BR', sort_by: 'vote_average.desc', vote_average_gte: 7.5, vote_count_gte: 300 }),
    requestCatalog<TmdbListResponse>({ action: 'discover', type: 'series', language: 'pt-BR', sort_by: 'popularity.desc', vote_count_gte: 10 }),
    requestCatalog<TmdbGenreResponse>({ action: 'genres', type: 'movie', language: 'pt-BR' }),
    requestCatalog<TmdbGenreResponse>({ action: 'genres', type: 'series', language: 'pt-BR' })
  ]);

  const genres = new Map<number, string>();
  [...(movieGenres.genres || []), ...(seriesGenres.genres || [])].forEach((genre) => genres.set(genre.id, genre.name));

  return {
    trending: mapResults(trendingData.results || [], genres).slice(0, 20),
    recent: mapResults(recentData.results || [], genres, 'movie').slice(0, 20),
    topRated: mapResults(topData.results || [], genres, 'movie').slice(0, 20),
    series: mapResults(seriesData.results || [], genres, 'series').slice(0, 20)
  };
}
