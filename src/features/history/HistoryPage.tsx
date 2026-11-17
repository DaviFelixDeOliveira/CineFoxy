import React from 'react';
import { History } from 'lucide-react';
import { PageLoading } from '@/components/feedback/PageLoading';
import { EmptyState } from '@/components/feedback/EmptyState';
import { ErrorState } from '@/components/feedback/ErrorState';
import { OfflineState } from '@/components/feedback/OfflineState';
import { useAsyncViewState } from '@/hooks/useAsyncViewState';
import type { AsyncViewStatus } from '@/hooks/useAsyncViewState';

export interface HistoryPageProps {
  forcedStatus?: AsyncViewStatus;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({ forcedStatus }) => {
  const { status, error, retry } = useAsyncViewState({
    hasData: false,
    forcedStatus
  });

  if (status === 'loading') {
    return (
      <div className="pageTransition">
        <PageLoading variant="history" />
      </div>
    );
  }

  if (status === 'offline') {
    return (
      <div className="pageTransition">
        <OfflineState onRetry={retry} />
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="pageTransition">
        <ErrorState error={error} onRetry={retry} />
      </div>
    );
  }

  return (
    <div className="pageTransition fadeIn">
      <h1 style={{ fontSize: 'var(--text-3xl)', fontWeight: 800, marginBottom: 'var(--space-6)' }}>
        Histórico e Continue Assistindo
      </h1>
      <EmptyState
        icon={<History size={32} />}
        title="Nenhum histórico recente"
        description="O registro do progresso de reprodução e histórico local será implementado na Fase 7 com armazenamento em IndexedDB."
      />
    </div>
  );
};
