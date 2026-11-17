import { describe, it, expect, vi, afterEach } from 'vitest';
import handler, {
  assertAllowedUpstreamUrl,
  buildTmdbUpstreamRequest,
  normalizeUpstreamError,
  readServerTmdbToken,
  resolveCacheHeaders,
  validateCatalogQuery
} from '../../netlify/functions/catalog';
import { CACHE_POLICIES } from '@/services/cache/cachePolicies';
import {
  API_CATALOG_ENDPOINT,
  buildCatalogProxyPath,
  mapProxyHttpError
} from '@/services/http/catalogProxyContract';

describe('Infraestrutura Segura Fase 3.2 — Proxy /api/catalog', () => {
  const originalToken = process.env.TMDB_API_READ_ACCESS_TOKEN;

  afterEach(() => {
    if (originalToken === undefined) {
      delete process.env.TMDB_API_READ_ACCESS_TOKEN;
    } else {
      process.env.TMDB_API_READ_ACCESS_TOKEN = originalToken;
    }
    vi.restoreAllMocks();
  });

  it('deve responder status 200 em action=status sem exigir token real e sem expor segredos', async () => {
    process.env.TMDB_API_READ_ACCESS_TOKEN = 'secret-test-token-value-123';
    const fetchSpy = vi.spyOn(globalThis, 'fetch');

    const req = new Request('http://localhost:8888/api/catalog?action=status', { method: 'GET' });
    const res = await handler(req);
    const bodyText = await res.text();
    const json = JSON.parse(bodyText);

    expect(res.status).toBe(200);
    expect(res.headers.get('Netlify-CDN-Cache-Control')).toBe('no-store');
    expect(res.headers.get('Cache-Control')).toBe('private, no-store');
    expect(json).toEqual({
      ok: true,
      service: 'cinefoxy-catalog-proxy',
      stage: '3.2',
      upstreamCallsEnabled: false,
      credentialsConfigured: true
    });
    expect(bodyText).not.toContain('secret-test-token-value-123');
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('deve indicar credentialsConfigured=false quando não houver token definido', async () => {
    delete process.env.TMDB_API_READ_ACCESS_TOKEN;
    expect(readServerTmdbToken()).toBeNull();

    const req = new Request('http://localhost:8888/api/catalog?action=status', { method: 'GET' });
    const res = await handler(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.credentialsConfigured).toBe(false);
  });

  it('deve rejeitar métodos HTTP diferentes de GET com 405 e Allow: GET', async () => {
    const req = new Request('http://localhost:8888/api/catalog?action=status', { method: 'POST' });
    const res = await handler(req);
    const json = await res.json();

    expect(res.status).toBe(405);
    expect(res.headers.get('Allow')).toBe('GET');
    expect(res.headers.get('Netlify-CDN-Cache-Control')).toBe('no-store');
    expect(res.headers.get('Cache-Control')).toBe('no-store');
    expect(json.error.code).toBe('ERR_METHOD_NOT_ALLOWED');
  });

  it('deve bloquear parâmetros de proxy aberto / SSRF com status 400', async () => {
    const attempts = [
      'http://localhost:8888/api/catalog?action=status&url=https://evil.com',
      'http://localhost:8888/api/catalog?action=discover&target=http://169.254.169.254/latest',
      'http://localhost:8888/api/catalog?action=search&query=matrix&endpoint=/admin'
    ];

    for (const url of attempts) {
      const res = await handler(new Request(url, { method: 'GET' }));
      const json = await res.json();
      expect(res.status).toBe(400);
      expect(json.error.code).toBe('ERR_FORBIDDEN_PROXY_PARAM');
      expect(res.headers.get('Cache-Control')).toBe('no-store');
    }
  });

  it('deve validar estritamente parâmetros de entrada e rejeitar entradas inválidas', async () => {
    const invalidUrls = [
      'http://localhost:8888/api/catalog',
      'http://localhost:8888/api/catalog?action=hack',
      'http://localhost:8888/api/catalog?action=trending&type=invalid',
      'http://localhost:8888/api/catalog?action=discover&page=999',
      'http://localhost:8888/api/catalog?action=discover&with_genres=abc',
      'http://localhost:8888/api/catalog?action=discover&date_gte=2024/01/01',
      'http://localhost:8888/api/catalog?action=search',
      'http://localhost:8888/api/catalog?action=search&query=%20%20'
    ];

    for (const url of invalidUrls) {
      const res = await handler(new Request(url, { method: 'GET' }));
      expect(res.status).toBe(400);
      expect(res.headers.get('Netlify-CDN-Cache-Control')).toBe('no-store');
      expect(res.headers.get('Cache-Control')).toBe('no-store');
    }
  });

  it('deve aceitar parâmetros válidos de catálogo na Etapa 3.2 retornando 501 sem disparar chamadas ao TMDB', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');

    const req = new Request(
      'http://localhost:8888/api/catalog?action=discover&type=movie&with_genres=28,12&page=1&language=pt-BR',
      { method: 'GET' }
    );
    const res = await handler(req);
    const json = await res.json();

    expect(res.status).toBe(501);
    expect(json.error.code).toBe('ERR_STAGE_NOT_IMPLEMENTED');
    expect(res.headers.get('Netlify-CDN-Cache-Control')).toBe('no-store');
    expect(res.headers.get('Cache-Control')).toBe('no-store');
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('deve validar lista de gêneros AND/OR corretamente na query', () => {
    const andResult = validateCatalogQuery(
      new URLSearchParams('action=discover&type=movie&with_genres=10749,18')
    );
    expect(andResult.ok).toBe(true);

    const orResult = validateCatalogQuery(
      new URLSearchParams('action=discover&type=movie&with_genres=27|53&with_keywords=779|4379')
    );
    expect(orResult.ok).toBe(true);
  });

  it('deve garantir whitelist de domínio HTTPS oficial do TMDB contra SSRF', () => {
    const valid = assertAllowedUpstreamUrl('https://api.themoviedb.org/3/trending/movie/week');
    expect(valid.hostname).toBe('api.themoviedb.org');

    expect(() => assertAllowedUpstreamUrl('http://api.themoviedb.org/3/movie/550')).toThrow('ERR_SSRF_BLOCKED');
    expect(() => assertAllowedUpstreamUrl('https://169.254.169.254/latest/meta-data')).toThrow('ERR_SSRF_BLOCKED');
    expect(() => assertAllowedUpstreamUrl('https://api.tvmaze.com/shows')).toThrow('ERR_SSRF_BLOCKED');
  });

  it('deve preparar requisição Bearer server-side com timeout sem executar fetch', () => {
    const { url, init } = buildTmdbUpstreamRequest(
      '/trending/movie/week',
      { language: 'pt-BR', page: 1 },
      'bearer-sample'
    );

    expect(url.toString()).toBe('https://api.themoviedb.org/3/trending/movie/week?language=pt-BR&page=1');
    expect((init.headers as Record<string, string>).Authorization).toBe('Bearer bearer-sample');
    expect(init.signal).toBeDefined();
  });

  it('deve aplicar cabeçalhos Netlify CDN e navegador conforme política oficial de cache', () => {
    const listings = resolveCacheHeaders('listings');
    expect(listings['Netlify-CDN-Cache-Control']).toBe(CACHE_POLICIES.listings.cdnHeader);
    expect(listings['Cache-Control']).toBe(CACHE_POLICIES.listings.browserHeader);

    const genres = resolveCacheHeaders('genres');
    expect(genres['Netlify-CDN-Cache-Control']).toBe(CACHE_POLICIES.genres.cdnHeader);
    expect(genres['Cache-Control']).toBe(CACHE_POLICIES.genres.browserHeader);

    const search = resolveCacheHeaders('search');
    expect(search['Netlify-CDN-Cache-Control']).toBe('no-store');
    expect(search['Cache-Control']).toBe('private, no-store');

    const error = resolveCacheHeaders('error');
    expect(error['Netlify-CDN-Cache-Control']).toBe('no-store');
    expect(error['Cache-Control']).toBe('no-store');
  });

  it('deve normalizar erros upstream (429, 401/403, 5xx) sem cache e sem expor detalhes internos', async () => {
    const rateLimited = normalizeUpstreamError(429, '30');
    expect(rateLimited.status).toBe(429);
    expect(rateLimited.headers.get('Retry-After')).toBe('30');
    expect(rateLimited.headers.get('Netlify-CDN-Cache-Control')).toBe('no-store');
    expect(rateLimited.headers.get('Cache-Control')).toBe('no-store');

    const unauthorized = normalizeUpstreamError(401);
    expect(unauthorized.status).toBe(503);
    const unauthorizedJson = await unauthorized.json();
    expect(unauthorizedJson.error.message).not.toContain('TMDB_API_READ_ACCESS_TOKEN');

    const gatewayTimeout = normalizeUpstreamError(504);
    expect(gatewayTimeout.status).toBe(504);
    expect(gatewayTimeout.headers.get('Cache-Control')).toBe('no-store');
  });

  it('deve construir caminhos relativos seguros e mapear erros no contrato do frontend', () => {
    const path = buildCatalogProxyPath({
      action: 'search',
      type: 'all',
      query: '  Interestelar ',
      page: 2
    });
    expect(path.startsWith(API_CATALOG_ENDPOINT)).toBe(true);
    expect(path).toContain('action=search');
    expect(path).toContain('query=Interestelar');

    const mapped = mapProxyHttpError(429, {
      ok: false,
      error: { code: 'ERR_RATE_LIMIT', message: 'Limite atingido', canRetry: true }
    });
    expect(mapped.code).toBe('ERR_RATE_LIMIT');
    expect(mapped.canRetry).toBe(true);
  });
});
