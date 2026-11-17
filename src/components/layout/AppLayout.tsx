import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import styles from './AppLayout.module.css';

export const AppLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div className={styles.wrapper}>
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
