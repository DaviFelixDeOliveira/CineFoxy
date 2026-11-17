import React from 'react';
import { Link } from 'react-router-dom';
import { Film, Tv } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { AnimatedPosterWall } from './AnimatedPosterWall';
import { ROUTES } from '@/app/config/constants';
import styles from './HeroBanner.module.css';

export interface HeroBannerProps {
  title?: string;
  subtitle?: string;
  description?: string;
  className?: string;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  title = 'CINEFOXY',
  subtitle = 'Seu Universo de Entretenimento',
  description = 'Histórias inesquecíveis, grandes produções e uma curadoria cinematográfica feita para você.',
  className
}) => {
  return (
    <section className={`${styles.heroSection} ${className || ''}`} aria-label="Apresentação CineFoxy">
      <AnimatedPosterWall />

      <div className={styles.contentWrapper}>
        <div className={styles.brandBadge}>
          <Badge variant="primary">UNIVERSO CINEFOXY</Badge>
        </div>

        <h1 className={styles.heroTitle}>{title}</h1>
        <h2 className={styles.heroSubtitle}>{subtitle}</h2>
        <p className={styles.heroDescription}>{description}</p>

        <div className={styles.actionGroup}>
          <Link to={ROUTES.MOVIES}>
            <Button size="lg" variant="primary" leftIcon={<Film size={18} />}>
              Explorar Filmes
            </Button>
          </Link>
          <Link to={ROUTES.SERIES}>
            <Button size="lg" variant="secondary" leftIcon={<Tv size={18} />}>
              Explorar Séries
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
