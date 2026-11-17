import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import type { AppError } from '@/types/error';
import { COMMON_ERRORS, HTTP_ERROR_MAP } from '@/services/error/errorCatalog';

export type AsyncViewStatus = 'loading' | 'success' | 'empty' | 'error' | 'offline';

export interface UseAsyncViewStateOptions {
  hasData: boolean;
  forcedStatus?: AsyncViewStatus;
  initialLoading?: boolean;
  error?: AppError | null;
}

export interface AsyncViewStateResult {
  status: AsyncViewStatus;
  isOnline: boolean;
  error: AppError;
  retry: () => void;
  setManualStatus: (status: AsyncViewStatus | null) => void;
}

const VALID_QUERY_STATES: AsyncViewStatus[] = ['loading', 'success', 'empty', 'error', 'offline'];

export function useAsyncViewState({
  hasData,
  forcedStatus,
  initialLoading = false,
  error = null
}: UseAsyncViewStateOptions): AsyncViewStateResult {
  const location = useLocation();
  const [isOnline, setIsOnline] = useState<boolean>(() =>
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [isLoading, setIsLoading] = useState<boolean>(initialLoading);
  const [manualStatus, setManualStatus] = useState<AsyncViewStatus | null>(null);
  const [internalError, setInternalError] = useState<AppError | null>(error);

  useEffect(() => {
    setInternalError(error);
  }, [error]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const queryParamState = (() => {
    const params = new URLSearchParams(location.search);
    const value = params.get('state') as AsyncViewStatus | null;
    return value && VALID_QUERY_STATES.includes(value) ? value : null;
  })();

  const retry = useCallback(() => {
    const onlineNow = typeof navigator !== 'undefined' ? navigator.onLine : true;
    setIsOnline(onlineNow);
    setInternalError(null);
    setManualStatus(null);
    setIsLoading(false);
  }, []);

  let status: AsyncViewStatus;
  if (forcedStatus) {
    status = forcedStatus;
  } else if (manualStatus) {
    status = manualStatus;
  } else if (queryParamState) {
    status = queryParamState;
  } else if (!isOnline) {
    status = 'offline';
  } else if (internalError) {
    status = 'error';
  } else if (isLoading) {
    status = 'loading';
  } else if (!hasData) {
    status = 'empty';
  } else {
    status = 'success';
  }

  return {
    status,
    isOnline,
    error: internalError || HTTP_ERROR_MAP[500] || COMMON_ERRORS.UNKNOWN,
    retry,
    setManualStatus
  };
}
