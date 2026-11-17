import type { AppError } from '@/types/error';
import { COMMON_ERRORS, resolveError } from '@/services/error/errorCatalog';

export const API_CATALOG_ENDPOINT = '/api/catalog' as const;

export type CatalogProxyAction = 'status' | 'trending' | 'discover' | 'search' | 'genres';
export type CatalogProxyMediaType = 'movie' | 'series' | 'all';

export interface CatalogProxyQuery {
  action: CatalogProxyAction;
  type?: CatalogProxyMediaType;
  page?: number;
  language?: 'pt-BR' | 'en-US';
  query?: string;
  with_genres?: string;
  with_keywords?: string;
  sort_by?: string;
  vote_average_gte?: number;
  vote_count_gte?: number;
  date_gte?: string;
  date_lte?: string;
}

export interface CatalogStatusResponse {
  ok: true;
  service: string;
  stage: string;
  upstreamCallsEnabled: boolean;
  credentialsConfigured: boolean;
}

export interface CatalogProxyErrorPayload {
  ok: false;
  error: {
    code: string;
    message: string;
    canRetry: boolean;
  };
}

/**
 * Monta exclusivamente URL relativa interna para o proxy /api/catalog,
 * nunca expondo URLs externas nem tokens no frontend.
 */
export function buildCatalogProxyPath(params: CatalogProxyQuery): string {
  const searchParams = new URLSearchParams();
  searchParams.set('action', params.action);

  if (params.type) searchParams.set('type', params.type);
  if (params.page !== undefined) searchParams.set('page', String(params.page));
  if (params.language) searchParams.set('language', params.language);
  if (params.query !== undefined) searchParams.set('query', params.query.trim());
  if (params.with_genres) searchParams.set('with_genres', params.with_genres);
  if (params.with_keywords) searchParams.set('with_keywords', params.with_keywords);
  if (params.sort_by) searchParams.set('sort_by', params.sort_by);
  if (params.vote_average_gte !== undefined) {
    searchParams.set('vote_average_gte', String(params.vote_average_gte));
  }
  if (params.vote_count_gte !== undefined) {
    searchParams.set('vote_count_gte', String(params.vote_count_gte));
  }
  if (params.date_gte) searchParams.set('date_gte', params.date_gte);
  if (params.date_lte) searchParams.set('date_lte', params.date_lte);

  return `${API_CATALOG_ENDPOINT}?${searchParams.toString()}`;
}

/**
 * Converte respostas de erro HTTP do proxy /api/catalog para o contrato AppError.
 */
export function mapProxyHttpError(status: number, payload?: Partial<CatalogProxyErrorPayload>): AppError {
  if (payload?.error?.message && payload.error.code) {
    return {
      code: payload.error.code,
      userMessage: payload.error.message,
      httpStatus: status,
      canRetry: payload.error.canRetry ?? status >= 500
    };
  }

  const resolved = resolveError({ status });
  return resolved || COMMON_ERRORS.UNKNOWN;
}
