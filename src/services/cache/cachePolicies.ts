/**
 * CineFoxy — Contratos de Políticas de Cache (Fase 3.2)
 *
 * Define os parâmetros oficiais de cache entre Netlify CDN (Netlify-CDN-Cache-Control),
 * navegador (Cache-Control) e sessão L1 em memória (TTL de referência para etapas futuras).
 *
 * Nota: O armazenamento em memória completo será implementado na Etapa 3.9.
 */

export type CachePolicyProfile = 'listings' | 'genres' | 'search' | 'status' | 'error';

export interface CachePolicyDefinition {
  profile: CachePolicyProfile;
  cdnHeader: string;
  browserHeader: string;
  sessionTtlMs: number;
}

export const CACHE_POLICIES: Record<CachePolicyProfile, CachePolicyDefinition> = {
  listings: {
    profile: 'listings',
    cdnHeader: 'public, durable, max-age=1800, stale-while-revalidate=3600',
    browserHeader: 'public, max-age=300',
    sessionTtlMs: 60 * 60 * 1000 // 1 hora
  },
  genres: {
    profile: 'genres',
    cdnHeader: 'public, durable, max-age=86400, stale-while-revalidate=604800',
    browserHeader: 'public, max-age=3600',
    sessionTtlMs: 24 * 60 * 60 * 1000 // 24 horas
  },
  search: {
    profile: 'search',
    cdnHeader: 'no-store',
    browserHeader: 'private, no-store',
    sessionTtlMs: 15 * 60 * 1000 // 15 minutos em sessão futura
  },
  status: {
    profile: 'status',
    cdnHeader: 'no-store',
    browserHeader: 'private, no-store',
    sessionTtlMs: 0
  },
  error: {
    profile: 'error',
    cdnHeader: 'no-store',
    browserHeader: 'no-store',
    sessionTtlMs: 0
  }
} as const;
