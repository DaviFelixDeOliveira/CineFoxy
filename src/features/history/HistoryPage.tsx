import React from 'react';
import { History } from 'lucide-react';
import { EmptyState } from '@/components/feedback/EmptyState';

export const HistoryPage: React.FC = () => {
  return (
    <div>
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
