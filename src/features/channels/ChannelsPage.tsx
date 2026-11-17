import React, { useState } from 'react';
import { Radio } from 'lucide-react';
import { ChannelCard } from '@/components/cards/ChannelCard';
import { PageLoading } from '@/components/feedback/PageLoading';
import { EmptyState } from '@/components/feedback/EmptyState';
import { ErrorState } from '@/components/feedback/ErrorState';
import { OfflineState } from '@/components/feedback/OfflineState';
import { useAsyncViewState } from '@/hooks/useAsyncViewState';
import type { AsyncViewStatus } from '@/hooks/useAsyncViewState';
import type { ChannelItem } from '@/types/media';
import styles from './ChannelsPage.module.css';

const CHANNEL_CATEGORIES = ['Todos', 'Notícias', 'Esportes', 'Entretenimento', 'Documentários'] as const;

export interface ChannelsPageProps {
  channels?: ChannelItem[];
  forcedStatus?: AsyncViewStatus;
}

export const ChannelsPage: React.FC<ChannelsPageProps> = ({
  channels = [],
  forcedStatus
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  const filteredChannels = channels.filter((channel) => {
    if (selectedCategory === 'Todos') return true;
    return channel.category === selectedCategory;
  });

  const { status, error, retry } = useAsyncViewState({
    hasData: filteredChannels.length > 0,
    forcedStatus
  });

  if (status === 'loading') {
    return (
      <div className="pageTransition">
        <PageLoading variant="channels" />
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
      <div className={styles.header}>
        <h1 className={styles.title}>Canais ao Vivo e Guia EPG</h1>
        <p className={styles.subtitle}>
          Canais públicos autorizados e programação ao vivo organizada por categoria.
        </p>

        <div className={styles.categoryTabs} role="group" aria-label="Categorias de canais">
          {CHANNEL_CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              aria-pressed={selectedCategory === category}
              className={`${styles.categoryTab} ${selectedCategory === category ? styles.categoryTabActive : ''}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {status === 'empty' || filteredChannels.length === 0 ? (
        <EmptyState
          icon={<Radio size={32} />}
          title="Nenhum canal cadastrado"
          description="A grade de canais públicos autorizados e o guia de programação interativo (EPG) serão integrados na Fase 6."
        />
      ) : (
        <div className={styles.grid}>
          {filteredChannels.map((channel) => (
            <ChannelCard key={channel.id} channel={channel} />
          ))}
        </div>
      )}
    </div>
  );
};
