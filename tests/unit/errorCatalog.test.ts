import { describe, it, expect } from 'vitest';
import { HTTP_ERROR_MAP, resolveError, COMMON_ERRORS } from '@/services/error/errorCatalog';

describe('Catálogo Centralizado de Erros (errorCatalog)', () => {
  it('deve conter mapeamento para todos os códigos HTTP obrigatórios', () => {
    const requiredStatuses = [400, 401, 403, 404, 408, 429, 500, 502, 503, 504];

    requiredStatuses.forEach((status) => {
      const mapped = HTTP_ERROR_MAP[status];
      expect(mapped).toBeDefined();
      expect(mapped.code).toMatch(/^ERR_/);
      expect(mapped.userMessage).toBeTruthy();
      expect(typeof mapped.canRetry).toBe('boolean');
    });
  });

  it('deve retornar mensagens amigáveis em português sem jargões técnicos para 404', () => {
    const error404 = HTTP_ERROR_MAP[404];
    expect(error404.userMessage).toContain('não foi encontrado');
    expect(error404.canRetry).toBe(false);
    expect(error404.actionLabel).toBe('Voltar ao início');
  });

  it('deve permitir repetição (canRetry: true) para erros de servidor e timeout', () => {
    expect(HTTP_ERROR_MAP[408].canRetry).toBe(true);
    expect(HTTP_ERROR_MAP[429].canRetry).toBe(true);
    expect(HTTP_ERROR_MAP[500].canRetry).toBe(true);
    expect(HTTP_ERROR_MAP[502].canRetry).toBe(true);
    expect(HTTP_ERROR_MAP[503].canRetry).toBe(true);
    expect(HTTP_ERROR_MAP[504].canRetry).toBe(true);
  });

  it('deve resolver objetos com propriedade status corretamente', () => {
    const resolved = resolveError({ status: 503 });
    expect(resolved.code).toBe('ERR_SERVICE_UNAVAILABLE');
    expect(resolved.canRetry).toBe(true);
  });

  it('deve retornar erro desconhecido padrão para exceções arbitrárias', () => {
    const resolved = resolveError(new Error('Falha arbitrária'));
    expect(resolved.code).toBe(COMMON_ERRORS.UNKNOWN.code);
    expect(resolved.userMessage).toContain('erro inesperado');
  });
});
