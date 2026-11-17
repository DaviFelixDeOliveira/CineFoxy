import React from 'react';
import { Radio } from 'lucide-react';
import { EmptyState } from '@/components/feedback/EmptyState';

export const ChannelsPage: React.FC = () => {
  return (
    <div>
      <h1 style={{ fontSize: 'var(--text-3xl)', fontWeight: 800, marginBottom: 'var(--space-6)' }}>
        Canais ao Vivo e Guia EPG
      </h1>
      <EmptyState
        icon={<Radio size={32} />}
        title="Guia de Canais em Preparação"
        description="A grade de canais públicos autorizados e o guia de programação interativo (EPG) serão integrados na Fase 6."
      />
    </div>
  );
};
