import React from 'react';
import { Search } from 'lucide-react';
import { EmptyState } from '@/components/feedback/EmptyState';

export const SearchPage: React.FC = () => {
  return (
    <div>
      <h1 style={{ fontSize: 'var(--text-3xl)', fontWeight: 800, marginBottom: 'var(--space-6)' }}>
        Pesquisa Global
      </h1>
      <EmptyState
        icon={<Search size={32} />}
        title="Busca Global em Preparação"
        description="A pesquisa unificada com suporte a filtros e busca instantânea no catálogo TMDB será implementada na Fase 3."
      />
    </div>
  );
};
