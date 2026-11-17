import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Film } from 'lucide-react';
import { HeroBanner } from '@/components/banners/HeroBanner';
import { MediaRow } from '@/components/sections/MediaRow';
import { CategoryCard } from '@/components/cards/CategoryCard';
import { PageLoading } from '@/components/feedback/PageLoading';
import { EmptyState } from '@/components/feedback/EmptyState';
import { ErrorState } from '@/components/feedback/ErrorState';
import { OfflineState } from '@/components/feedback/OfflineState';
import { CINEFOXY_CATEGORIES } from '@/types/category';
import { ROUTES } from '@/app/config/constants';
import { fetchHomeCatalog, CatalogRequestError } from '@/services/catalog/homeCatalogService';
import type { AppError } from '@/types/error';
import type { MediaItem } from '@/types/media';
import type { AsyncViewStatus } from '@/hooks/useAsyncViewState';
import styles from './HomePage.module.css';

export interface HomePageProps {
  forcedStatus?: AsyncViewStatus;
}

export const HomePage: React.FC<HomePageProps> = ({ forcedStatus }) => {
  const [status, setStatus] = useState<AsyncViewStatus>('loading');
  const [catalog, setCatalog] = useState<{ trending: MediaItem[]; recent: MediaItem[]; topRated: MediaItem[]; series: MediaItem[] } | null>(null);
  const [error, setError] = useState<AppError>({
    code: 'ERR_UNKNOWN',
    userMessage: 'Não foi possível carregar o catálogo.',
    canRetry: true
  });

  const loadCatalog = useCallback(async () => {
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      setStatus('offline');
      return;
    }
    setStatus('loading');
    setError({
      code: 'ERR_UNKNOWN',
      userMessage: 'Não foi possível carregar o catálogo.',
      canRetry: true
    });
    try {
      const data = await fetchHomeCatalog();
      setCatalog(data);
      const hasAnyContent = data.trending.length + data.recent.length + data.topRated.length + data.series.length > 0;
      setStatus(hasAnyContent ? 'success' : 'empty');
    } catch (cause) {
      if (cause instanceof CatalogRequestError) {
        setError(cause.appError);
      } else {
        setError({
          code: 'ERR_CATALOG_LOAD',
          userMessage: 'Não foi possível carregar os destaques. Tente novamente.',
          canRetry: true
        });
      }
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    void loadCatalog();
  }, [loadCatalog]);

  if (forcedStatus === 'loading' || status === 'loading') {
    return <div className="pageTransition"><PageLoading variant="home" /></div>;
  }
  if (forcedStatus === 'offline' || status === 'offline') {
    return <div className="pageTransition"><OfflineState onRetry={() => void loadCatalog()} /></div>;
  }
  if (forcedStatus === 'error' || status === 'error') {
    return <div className="pageTransition"><ErrorState error={error} onRetry={() => void loadCatalog()} /></div>;
  }
  if (forcedStatus === 'empty' || status === 'empty' || !catalog) {
    return (
      <div className="pageTransition">
        <EmptyState
          icon={<Film size={32} />}
          title="Nenhum título em destaque no momento"
          description="Não encontramos produções para exibir agora. Tente novamente mais tarde."
          action={<button type="button" onClick={() => void loadCatalog()}>Tentar novamente</button>}
        />
      </div>
    );
  }

  const featuredCategories = CINEFOXY_CATEGORIES.slice(0, 4);

  return (
    <div className="pageTransition fadeIn">
      <HeroBanner />
      <MediaRow
        title="🔥 Em Alta no CineFoxy"
        description="Filmes e séries populares nesta semana"
        items={catalog.trending}
      />
      <MediaRow
        title="✨ Lançamentos Recentes"
        description="Filmes lançados recentemente"
        items={catalog.recent}
      />
      <MediaRow
        title="🏆 Mais Bem Avaliados"
        description="Filmes com as melhores avaliações do público"
        items={catalog.topRated}
      />
      <MediaRow
        title="📺 Séries em Destaque"
        description="Séries populares para descobrir"
        items={catalog.series}
      />
      <section className={styles.categoriesSection} aria-label="Categorias em destaque">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Categorias em Destaque</h2>
          <Link to={ROUTES.CATEGORIES} className={styles.seeAllLink}>Ver todas</Link>
        </div>
        <div className={styles.categoriesGrid}>
          {featuredCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>
    </div>
  );
};
