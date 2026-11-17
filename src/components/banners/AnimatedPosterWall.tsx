import React from 'react';
import { PosterColumn } from './PosterColumn';
import posterSciFi from '@/assets/images/poster_scifi_odyssey_1794925133678.webp';
import posterCyber from '@/assets/images/poster_cyber_thriller_1794925133154.webp';
import posterFantasy from '@/assets/images/poster_fantasy_kingdom_1794925134030.webp';
import posterAction from '@/assets/images/poster_action_heist_1794925135529.webp';
import posterFox from '@/assets/images/poster_animated_fox_1794925136368.webp';
import posterHorror from '@/assets/images/poster_horror_manor_1794925134953.webp';
import posterRomance from '@/assets/images/poster_romance_twilight_1794925137827.webp';
import posterArctic from '@/assets/images/poster_arctic_survival_1794925137795.webp';
import styles from './AnimatedPosterWall.module.css';

const POSTER_COLUMNS = [
  {
    id: 'col-1',
    images: [posterSciFi, posterAction, posterCyber, posterFantasy, posterFox],
    direction: 'up' as const,
    durationSeconds: 34,
    responsiveClass: ''
  },
  {
    id: 'col-2',
    images: [posterHorror, posterRomance, posterArctic, posterSciFi, posterCyber],
    direction: 'down' as const,
    durationSeconds: 46,
    responsiveClass: ''
  },
  {
    id: 'col-3',
    images: [posterFox, posterFantasy, posterAction, posterHorror, posterRomance],
    direction: 'up' as const,
    durationSeconds: 39,
    responsiveClass: ''
  },
  {
    id: 'col-4',
    images: [posterCyber, posterArctic, posterSciFi, posterRomance, posterFantasy],
    direction: 'down' as const,
    durationSeconds: 52,
    responsiveClass: styles.tabletUp
  },
  {
    id: 'col-5',
    images: [posterAction, posterHorror, posterFox, posterArctic, posterSciFi],
    direction: 'up' as const,
    durationSeconds: 36,
    responsiveClass: styles.desktopOnly
  },
  {
    id: 'col-6',
    images: [posterRomance, posterCyber, posterFantasy, posterAction, posterHorror],
    direction: 'down' as const,
    durationSeconds: 48,
    responsiveClass: styles.desktopOnly
  }
];

export const AnimatedPosterWall: React.FC = () => {
  return (
    <div className={styles.wallContainer} aria-hidden="true">
      <div className={styles.columnsGrid}>
        {POSTER_COLUMNS.map((col) => (
          <PosterColumn
            key={col.id}
            images={col.images}
            direction={col.direction}
            durationSeconds={col.durationSeconds}
            className={col.responsiveClass}
          />
        ))}
      </div>

      <div className={styles.vignetteOverlay} />
      <div className={styles.bottomArc} />
      <div className={styles.bottomFade} />
    </div>
  );
};
