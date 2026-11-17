import type { AppError } from '@/types/error';

export const HTTP_ERROR_MAP: Record<number, AppError> = {
  400: {
    code: 'ERR_BAD_REQUEST',
    userMessage: 'A requisição não pôde ser processada pelo servidor.',
    httpStatus: 400,
    canRetry: false
  },
  401: {
    code: 'ERR_UNAUTHORIZED',
    userMessage: 'Acesso não autorizado ao conteúdo solicitado.',
    httpStatus: 401,
    canRetry: false
  },
  403: {
    code: 'ERR_FORBIDDEN',
    userMessage: 'Você não possui permissão para acessar este recurso.',
    httpStatus: 403,
    canRetry: false
  },
  404: {
    code: 'ERR_NOT_FOUND',
    userMessage: 'O conteúdo solicitado não foi encontrado.',
    httpStatus: 404,
    canRetry: false,
    actionLabel: 'Voltar ao início'
  },
  408: {
    code: 'ERR_TIMEOUT',
    userMessage: 'O servidor demorou muito para responder. Verifique sua conexão.',
    httpStatus: 408,
    canRetry: true,
    actionLabel: 'Tentar novamente'
  },
  429: {
    code: 'ERR_RATE_LIMIT',
    userMessage: 'Muitas solicitações simultâneas. Por favor, aguarde alguns instantes.',
    httpStatus: 429,
    canRetry: true,
    actionLabel: 'Tentar novamente'
  },
  500: {
    code: 'ERR_SERVER_ERROR',
    userMessage: 'Ocorreu um erro interno nos servidores do catálogo.',
    httpStatus: 500,
    canRetry: true,
    actionLabel: 'Tentar novamente'
  },
  502: {
    code: 'ERR_BAD_GATEWAY',
    userMessage: 'Serviço temporariamente indisponível. Estamos restabelecendo a conexão.',
    httpStatus: 502,
    canRetry: true,
    actionLabel: 'Tentar novamente'
  },
  503: {
    code: 'ERR_SERVICE_UNAVAILABLE',
    userMessage: 'O serviço está em manutenção ou sobrecarregado no momento.',
    httpStatus: 503,
    canRetry: true,
    actionLabel: 'Tentar novamente'
  },
  504: {
    code: 'ERR_GATEWAY_TIMEOUT',
    userMessage: 'Tempo limite esgotado ao contatar o servidor de dados.',
    httpStatus: 504,
    canRetry: true,
    actionLabel: 'Tentar novamente'
  }
};

export const COMMON_ERRORS = {
  OFFLINE: {
    code: 'ERR_OFFLINE',
    userMessage: 'Você está sem conexão com a internet. Verifique seu Wi-Fi ou dados móveis.',
    canRetry: true,
    actionLabel: 'Tentar novamente'
  },
  UNKNOWN: {
    code: 'ERR_UNKNOWN',
    userMessage: 'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.',
    canRetry: true,
    actionLabel: 'Tentar novamente'
  }
} as const;

export function resolveError(error: unknown): AppError {
  if (typeof error === 'object' && error !== null && 'status' in error) {
    const status = (error as { status: number }).status;
    if (HTTP_ERROR_MAP[status]) {
      return HTTP_ERROR_MAP[status];
    }
  }

  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return COMMON_ERRORS.OFFLINE;
  }

  return COMMON_ERRORS.UNKNOWN;
}
