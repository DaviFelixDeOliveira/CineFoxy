/**
 * CineFoxy — Netlify Function: Proxy Seguro de Catálogo (/api/catalog)
 *
 * Etapa 3.3 (Integração TMDB):
 * - Recebe e valida requisições HTTP do frontend.
 * - Mantém TMDB_API_READ_ACCESS_TOKEN restrito ao ambiente server-side.
 * - Impede proxy aberto / SSRF por meio de whitelist estrita de ações e host.
 * - Define cabeçalhos separados para Netlify CDN (Netlify-CDN-Cache-Control)
 *   e navegador (Cache-Control), garantindo ausência de cache em erros e buscas.
 *
 * As consultas ao TMDB são executadas exclusivamente no servidor, usando token Bearer privado.
 */

export type CatalogAction = 'status' | 'trending' | 'discover' | 'search' | 'genres';
export type CatalogMediaType = 'movie' | 'series' | 'all';
export type CacheCategory = 'status' | 'listings' | 'genres' | 'search' | 'error';

export const ALLOWED_CATALOG_ACTIONS: readonly CatalogAction[] = [
  'status',
  'trending',
  'discover',
  'search',
  'genres'
] as const;

export const ALLOWED_UPSTREAM_HOSTS: readonly string[] = ['api.themoviedb.org'] as const;
export const TMDB_API_BASE_URL = 'https://api.themoviedb.org/3';
export const UPSTREAM_TIMEOUT_MS = 8000;

const FORBIDDEN_PROXY_PARAMS = new Set([
  'url',
  'target',
  'endpoint',
  'host',
  'proxy',
  'redirect',
  'next',
  'path',
  'uri',
  'callback'
]);

const ALLOWED_MEDIA_TYPES = new Set<CatalogMediaType>(['movie', 'series', 'all']);
const ALLOWED_LANGUAGES = new Set(['pt-BR', 'en-US']);
const ALLOWED_SORT_BY = new Set([
  'popularity.desc',
  'popularity.asc',
  'vote_average.desc',
  'vote_average.asc',
  'primary_release_date.desc',
  'primary_release_date.asc',
  'first_air_date.desc',
  'first_air_date.asc',
  'vote_count.desc'
]);

const NUMERIC_LIST_REGEX = /^\d+([,|]\d+)*$/;
const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export interface ValidatedCatalogParams {
  action: CatalogAction;
  type: CatalogMediaType;
  page: number;
  language: 'pt-BR' | 'en-US';
  query?: string;
  withGenres?: string;
  withKeywords?: string;
  sortBy?: string;
  voteAverageGte?: number;
  voteCountGte?: number;
  dateGte?: string;
  dateLte?: string;
}

export interface ValidationResult {
  ok: true;
  params: ValidatedCatalogParams;
}

export interface ValidationErrorResult {
  ok: false;
  status: number;
  code: string;
  message: string;
}

/**
 * Lê exclusivamente a credencial server-side de leitura do TMDB.
 * Nunca utiliza variáveis com prefixo VITE_.
 */
export function readServerTmdbToken(): string | null {
  if (typeof process === 'undefined' || !process.env) {
    return null;
  }
  const raw = process.env.TMDB_API_READ_ACCESS_TOKEN;
  if (!raw) return null;
  const trimmed = raw.trim();
  return trimmed.length > 0 ? trimmed : null;
}

/**
 * Garante que apenas o domínio oficial TMDB em HTTPS possa ser contatado no servidor.
 */
export function assertAllowedUpstreamUrl(rawUrl: string): URL {
  let parsed: URL;
  try {
    parsed = new URL(rawUrl);
  } catch {
    throw new Error('ERR_INVALID_UPSTREAM_URL');
  }

  if (parsed.protocol !== 'https:' || !ALLOWED_UPSTREAM_HOSTS.includes(parsed.hostname)) {
    throw new Error('ERR_SSRF_BLOCKED');
  }

  return parsed;
}

/**
 * Resolve cabeçalhos explícitos e separados para Netlify CDN e Navegador.
 */
export function resolveCacheHeaders(category: CacheCategory): Record<string, string> {
  switch (category) {
    case 'listings':
      return {
        'Netlify-CDN-Cache-Control': 'public, durable, max-age=1800, stale-while-revalidate=3600',
        'Cache-Control': 'public, max-age=300'
      };
    case 'genres':
      return {
        'Netlify-CDN-Cache-Control': 'public, durable, max-age=86400, stale-while-revalidate=604800',
        'Cache-Control': 'public, max-age=3600'
      };
    case 'search':
    case 'status':
      return {
        'Netlify-CDN-Cache-Control': 'no-store',
        'Cache-Control': 'private, no-store'
      };
    case 'error':
    default:
      return {
        'Netlify-CDN-Cache-Control': 'no-store',
        'Cache-Control': 'no-store'
      };
  }
}

export function createJsonResponse(
  status: number,
  body: Record<string, unknown>,
  cacheCategory: CacheCategory,
  extraHeaders: Record<string, string> = {}
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
      ...resolveCacheHeaders(cacheCategory),
      ...extraHeaders
    }
  });
}

/**
 * Validação estrita dos parâmetros recebidos pelo endpoint /api/catalog.
 */
export function validateCatalogQuery(
  searchParams: URLSearchParams
): ValidationResult | ValidationErrorResult {
  // 1. Bloqueia qualquer tentativa de proxy aberto
  for (const key of searchParams.keys()) {
    if (FORBIDDEN_PROXY_PARAMS.has(key.toLowerCase())) {
      return {
        ok: false,
        status: 400,
        code: 'ERR_FORBIDDEN_PROXY_PARAM',
        message: 'Parâmetro não permitido pela política de segurança do proxy.'
      };
    }
  }

  // 2. Validação da ação contra whitelist
  const actionParam = searchParams.get('action')?.trim() || '';
  if (!ALLOWED_CATALOG_ACTIONS.includes(actionParam as CatalogAction)) {
    return {
      ok: false,
      status: 400,
      code: 'ERR_INVALID_ACTION',
      message: 'Ação de catálogo ausente ou não permitida.'
    };
  }
  const action = actionParam as CatalogAction;

  // 3. Validação de tipo de mídia
  const typeParam = (searchParams.get('type')?.trim() || 'all') as CatalogMediaType;
  if (!ALLOWED_MEDIA_TYPES.has(typeParam)) {
    return {
      ok: false,
      status: 400,
      code: 'ERR_INVALID_MEDIA_TYPE',
      message: 'Tipo de mídia inválido. Valores aceitos: movie, series ou all.'
    };
  }

  // 4. Validação de idioma
  const langParam = searchParams.get('language')?.trim() || 'pt-BR';
  if (!ALLOWED_LANGUAGES.has(langParam)) {
    return {
      ok: false,
      status: 400,
      code: 'ERR_INVALID_LANGUAGE',
      message: 'Idioma não suportado. Valores aceitos: pt-BR ou en-US.'
    };
  }

  // 5. Validação de página (1..500)
  const rawPage = searchParams.get('page');
  let page = 1;
  if (rawPage !== null) {
    if (!/^\d+$/.test(rawPage)) {
      return {
        ok: false,
        status: 400,
        code: 'ERR_INVALID_PAGE',
        message: 'Número de página inválido.'
      };
    }
    page = Number.parseInt(rawPage, 10);
    if (page < 1 || page > 500) {
      return {
        ok: false,
        status: 400,
        code: 'ERR_INVALID_PAGE_RANGE',
        message: 'A página deve estar entre 1 e 500.'
      };
    }
  }

  // 6. Validação do termo de busca (obrigatório quando action=search)
  const rawQuery = searchParams.get('query');
  let query: string | undefined;
  if (rawQuery !== null) {
    const trimmed = rawQuery.trim();
    if (trimmed.length < 1 || trimmed.length > 100) {
      return {
        ok: false,
        status: 400,
        code: 'ERR_INVALID_QUERY',
        message: 'O termo de busca deve possuir entre 1 e 100 caracteres.'
      };
    }
    query = trimmed;
  } else if (action === 'search') {
    return {
      ok: false,
      status: 400,
      code: 'ERR_MISSING_QUERY',
      message: 'O parâmetro query é obrigatório para pesquisas.'
    };
  }

  // 7. Validação de gêneros e keywords numéricos separados por ',' ou '|'
  const withGenres = searchParams.get('with_genres')?.trim();
  if (withGenres && !NUMERIC_LIST_REGEX.test(withGenres)) {
    return {
      ok: false,
      status: 400,
      code: 'ERR_INVALID_GENRES',
      message: 'Formato inválido para identificadores de gênero.'
    };
  }

  const withKeywords = searchParams.get('with_keywords')?.trim();
  if (withKeywords && !NUMERIC_LIST_REGEX.test(withKeywords)) {
    return {
      ok: false,
      status: 400,
      code: 'ERR_INVALID_KEYWORDS',
      message: 'Formato inválido para identificadores de palavras-chave.'
    };
  }

  // 8. Validação de ordenação
  const sortBy = searchParams.get('sort_by')?.trim();
  if (sortBy && !ALLOWED_SORT_BY.has(sortBy)) {
    return {
      ok: false,
      status: 400,
      code: 'ERR_INVALID_SORT',
      message: 'Critério de ordenação não permitido.'
    };
  }

  // 9. Validação de nota mínima e votos mínimos
  const rawVoteAvg = searchParams.get('vote_average_gte');
  let voteAverageGte: number | undefined;
  if (rawVoteAvg !== null) {
    const parsed = Number(rawVoteAvg);
    if (!Number.isFinite(parsed) || parsed < 0 || parsed > 10) {
      return {
        ok: false,
        status: 400,
        code: 'ERR_INVALID_RATING',
        message: 'A nota mínima deve estar entre 0 e 10.'
      };
    }
    voteAverageGte = parsed;
  }

  const rawVoteCount = searchParams.get('vote_count_gte');
  let voteCountGte: number | undefined;
  if (rawVoteCount !== null) {
    if (!/^\d+$/.test(rawVoteCount)) {
      return {
        ok: false,
        status: 400,
        code: 'ERR_INVALID_VOTE_COUNT',
        message: 'A contagem mínima de votos deve ser um número inteiro não negativo.'
      };
    }
    voteCountGte = Number.parseInt(rawVoteCount, 10);
  }

  // 10. Validação de datas ISO (YYYY-MM-DD)
  const dateGte = searchParams.get('date_gte')?.trim();
  if (dateGte && !ISO_DATE_REGEX.test(dateGte)) {
    return {
      ok: false,
      status: 400,
      code: 'ERR_INVALID_DATE',
      message: 'Formato de data inválido. Utilize YYYY-MM-DD.'
    };
  }

  const dateLte = searchParams.get('date_lte')?.trim();
  if (dateLte && !ISO_DATE_REGEX.test(dateLte)) {
    return {
      ok: false,
      status: 400,
      code: 'ERR_INVALID_DATE',
      message: 'Formato de data inválido. Utilize YYYY-MM-DD.'
    };
  }

  return {
    ok: true,
    params: {
      action,
      type: typeParam,
      page,
      language: langParam as 'pt-BR' | 'en-US',
      ...(query ? { query } : {}),
      ...(withGenres ? { withGenres } : {}),
      ...(withKeywords ? { withKeywords } : {}),
      ...(sortBy ? { sortBy } : {}),
      ...(voteAverageGte !== undefined ? { voteAverageGte } : {}),
      ...(voteCountGte !== undefined ? { voteCountGte } : {}),
      ...(dateGte ? { dateGte } : {}),
      ...(dateLte ? { dateLte } : {})
    }
  };
}

/**
 * Padroniza falhas de APIs externas sem vazar credenciais ou detalhes internos.
 */
export function normalizeUpstreamError(upstreamStatus: number, retryAfter?: string | null): Response {
  if (upstreamStatus === 429) {
    const extra: Record<string, string> = {};
    if (retryAfter && /^\d+$/.test(retryAfter.trim())) {
      extra['Retry-After'] = retryAfter.trim();
    }
    return createJsonResponse(
      429,
      {
        ok: false,
        error: {
          code: 'ERR_RATE_LIMIT',
          message: 'Muitas solicitações simultâneas ao catálogo. Aguarde alguns instantes.',
          canRetry: true
        }
      },
      'error',
      extra
    );
  }

  if (upstreamStatus === 401 || upstreamStatus === 403) {
    return createJsonResponse(
      503,
      {
        ok: false,
        error: {
          code: 'ERR_CATALOG_UNAVAILABLE',
          message: 'Serviço de catálogo temporariamente indisponível.',
          canRetry: true
        }
      },
      'error'
    );
  }

  if (upstreamStatus === 404) {
    return createJsonResponse(
      404,
      {
        ok: false,
        error: {
          code: 'ERR_NOT_FOUND',
          message: 'O conteúdo solicitado não foi encontrado.',
          canRetry: false
        }
      },
      'error'
    );
  }

  if (upstreamStatus === 408 || upstreamStatus === 504) {
    return createJsonResponse(
      504,
      {
        ok: false,
        error: {
          code: 'ERR_GATEWAY_TIMEOUT',
          message: 'Tempo limite esgotado ao consultar os dados externos.',
          canRetry: true
        }
      },
      'error'
    );
  }

  return createJsonResponse(
    502,
    {
      ok: false,
      error: {
        code: 'ERR_BAD_GATEWAY',
        message: 'Serviço temporariamente indisponível. Tente novamente em instantes.',
        canRetry: true
      }
    },
    'error'
  );
}

/**
 * Prepara a configuração de requisição server-side ao TMDB (com timeout e token Bearer)
 * para ativação na Etapa 3.3. Nunca executada durante a Etapa 3.2.
 */
export function buildTmdbUpstreamRequest(
  path: string,
  params: Record<string, string | number | boolean | undefined>,
  token: string
): { url: URL; init: RequestInit } {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const url = assertAllowedUpstreamUrl(`${TMDB_API_BASE_URL}${cleanPath}`);

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== '') {
      url.searchParams.set(key, String(value));
    }
  }

  return {
    url,
    init: {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      },
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS)
    }
  };
}

/**
 * Handler principal da Netlify Function (Web Request/Response API).
 */
export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'GET') {
    return createJsonResponse(
      405,
      {
        ok: false,
        error: {
          code: 'ERR_METHOD_NOT_ALLOWED',
          message: 'Método HTTP não permitido neste endpoint.',
          canRetry: false
        }
      },
      'error',
      { Allow: 'GET' }
    );
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(request.url);
  } catch {
    return createJsonResponse(
      400,
      {
        ok: false,
        error: {
          code: 'ERR_BAD_REQUEST',
          message: 'URL de requisição malformada.',
          canRetry: false
        }
      },
      'error'
    );
  }

  const validation = validateCatalogQuery(parsedUrl.searchParams);
  if (!validation.ok) {
    return createJsonResponse(
      validation.status,
      {
        ok: false,
        error: {
          code: validation.code,
          message: validation.message,
          canRetry: false
        }
      },
      'error'
    );
  }

  const token = readServerTmdbToken();

  if (validation.params.action === 'status') {
    return createJsonResponse(
      200,
      {
        ok: true,
        service: 'cinefoxy-catalog-proxy',
        stage: '3.3',
        upstreamCallsEnabled: true,
        credentialsConfigured: Boolean(token)
      },
      'status'
    );
  }

  if (!token) {
    return createJsonResponse(503, {
      ok: false,
      error: {
        code: 'ERR_CREDENTIALS_MISSING',
        message: 'O catálogo está temporariamente indisponível.',
        canRetry: false
      }
    }, 'error');
  }

  const params = validation.params;
  let upstreamPath: string;
  let cacheCategory: CacheCategory = 'listings';
  const upstreamParams: Record<string, string | number | boolean | undefined> = {
    language: params.language,
    page: params.page
  };

  if (params.action === 'trending') {
    const mediaType = params.type === 'series' ? 'tv' : params.type;
    upstreamPath = `/trending/${mediaType}/week`;
  } else if (params.action === 'genres') {
    const mediaType = params.type === 'series' ? 'tv' : params.type === 'all' ? 'movie' : params.type;
    upstreamPath = `/genre/${mediaType}/list`;
    cacheCategory = 'genres';
  } else if (params.action === 'search') {
    const mediaType = params.type === 'series' ? 'tv' : params.type;
    upstreamPath = `/search/${mediaType}`;
    upstreamParams.query = params.query;
    cacheCategory = 'search';
  } else {
    const mediaType = params.type === 'series' ? 'tv' : params.type;
    upstreamPath = `/discover/${mediaType}`;
    upstreamParams.sort_by = params.sortBy || 'popularity.desc';
    upstreamParams.with_genres = params.withGenres;
    upstreamParams.with_keywords = params.withKeywords;
    upstreamParams['vote_average.gte'] = params.voteAverageGte;
    upstreamParams['vote_count.gte'] = params.voteCountGte;
    upstreamParams['primary_release_date.gte'] = params.dateGte;
    upstreamParams['primary_release_date.lte'] = params.dateLte;
  }

  try {
    const upstream = buildTmdbUpstreamRequest(upstreamPath, upstreamParams, token);
    const upstreamResponse = await fetch(upstream.url, upstream.init);
    if (!upstreamResponse.ok) {
      return normalizeUpstreamError(
        upstreamResponse.status,
        upstreamResponse.headers.get('retry-after')
      );
    }

    const payload = await upstreamResponse.json() as Record<string, unknown>;
    return createJsonResponse(200, { ok: true, data: payload }, cacheCategory);
  } catch (error) {
    if (error instanceof Error && error.name === 'TimeoutError') {
      return normalizeUpstreamError(504);
    }
    return createJsonResponse(502, {
      ok: false,
      error: {
        code: 'ERR_UPSTREAM_UNAVAILABLE',
        message: 'Não foi possível consultar o catálogo agora.',
        canRetry: true
      }
    }, 'error');
  }
}
