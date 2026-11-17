import React, { useState } from 'react';
import type { ChannelItem } from '@/types/media';
import { Badge } from '@/components/ui/Badge';
import styles from './ChannelCard.module.css';

export interface ChannelCardProps {
  channel: ChannelItem;
  onClick?: () => void;
  className?: string;
}

export const ChannelCard: React.FC<ChannelCardProps> = ({ channel, onClick, className }) => {
  const [logoError, setLogoError] = useState(false);

  return (
    <article
      className={`${styles.card} ${className || ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      aria-label={`Canal ${channel.name} ao vivo`}
    >
      <div className={styles.thumbWrapper}>
        {channel.isLive && (
          <div className={styles.liveBadge}>
            <Badge variant="live" withPulse>
              AO VIVO
            </Badge>
          </div>
        )}
        {!logoError && channel.logoUrl ? (
          <img
            src={channel.logoUrl}
            alt={channel.name}
            className={styles.logo}
            loading="lazy"
            onError={() => setLogoError(true)}
          />
        ) : (
          <span style={{ fontWeight: 700, color: 'var(--brand-primary)' }}>{channel.name}</span>
        )}
      </div>

      <div className={styles.info}>
        <h3 className={styles.channelName}>{channel.name}</h3>
        {channel.currentProgram && (
          <p className={styles.program}>No ar: {channel.currentProgram.title}</p>
        )}
      </div>
    </article>
  );
};
