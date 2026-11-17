import React from 'react';
import { CategoryCard } from '@/components/cards/CategoryCard';
import { CINEFOXY_CATEGORIES } from '@/types/category';
import styles from './CategoriesPage.module.css';

export const CategoriesPage: React.FC = () => {
  return (
    <div className="pageTransition">
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
