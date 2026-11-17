import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import styles from './AppLayout.module.css';

let hasPlayedBootIntro = false;

export const AppLayout: React.FC = () => {
  const location = useLocation();
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    if (hasPlayedBootIntro) return false;
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      return false;
    }
    return true;
  });

  useEffect(() => {
    if (!showIntro) return;
    hasPlayedBootIntro = true;
    const timer = window.setTimeout(() => {
      setShowIntro(false);
    }, 900);
    return () => window.clearTimeout(timer);
  }, [showIntro]);

  useEffect(() => {
    if (typeof navigator !== 'undefined' && !navigator.userAgent.includes('jsdom')) {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [location.pathname]);

  return (
    <div className={styles.wrapper}>
      {showIntro && (
        <div className={styles.introOverlay} aria-hidden="true">
          <div className={styles.introGlow} />
          <div className={styles.introLogoBox}>
            <img src="/img/logo.png" alt="" className={styles.introLogo} />
          </div>
        </div>
      )}

      <div key={`bar-${location.pathname}`} className={styles.routeSweepBar} aria-hidden="true" />

      <Header />
      <main className={styles.main}>
        <div key={location.pathname} className={styles.pageRouteWrapper}>
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};
