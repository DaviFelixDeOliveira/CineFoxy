import React from 'react';
import { LayoutGrid } from 'lucide-react';
import { CategoryCard } from '@/components/cards/CategoryCard';
import { PageLoading } from '@/components/feedback/PageLoading';
import { EmptyState } from '@/components/feedback/EmptyState';
import { ErrorState } from '@/components/feedback/ErrorState';
import { OfflineState } from '@/components/feedback/OfflineState';
import { useAsyncViewState } from '@/hooks/useAsyncViewState';
import type { AsyncViewStatus } from '@/hooks/useAsyncViewState';
import { CINEFOXY_CATEGORIES } from '@/types/category';
import styles from './CategoriesPage.module.css';

export interface CategoriesPageProps {
  forcedStatus?: AsyncViewStatus;
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({ forcedStatus }) => {
  const { status, error, retry } = useAsyncViewState({
    hasData: CINEFOXY_CATEGORIES.length > 0,
    forcedStatus
  });

  if (status === 'loading') {
    return (
      <div className="pageTransition">
        <PageLoading variant="categories" />
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

  if (status === 'empty') {
    return (
      <div className="pageTransition">
        <EmptyState
          icon={<LayoutGrid size={32} />}
          title="Nenhuma categoria encontrada"
          description="Não há categorias disponíveis para exibição no momento."
        />
      </div>
    );
  }

  return (
    <div className="pageTransition fadeIn">
      <div className={styles.header}>
        <h1 className={styles.title}>Explorar Categorias</h1>
        <p className={styles.subtitle}>
          Navegue pelos gêneros cinematográficos clássicos e descubra novas produções para assistir.
        </p>
      </div>

      <div className={styles.grid}>
        {CINEFOXY_CATEGORIES.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};
