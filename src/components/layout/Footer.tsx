import React from 'react';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <img src="/img/logo.png" alt="CineFoxy" className={styles.logo} />
          <span className={styles.brandName}>CineFoxy</span>
        </div>
        <p className={styles.note}>
          Plataforma de entretenimento audiovisual. Interface desenvolvida com foco em navegadores
          desktop, mobile e Smart TVs.
        </p>
      </div>
    </footer>
  );
};
