import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { HomePage } from '@/features/home/HomePage';
import { MoviesPage } from '@/features/movies/MoviesPage';
import { SeriesPage } from '@/features/series/SeriesPage';
import { CategoriesPage } from '@/features/categories/CategoriesPage';
import { CategoryDetailPage } from '@/features/categories/CategoryDetailPage';
import { ChannelsPage } from '@/features/channels/ChannelsPage';
import { FavoritesPage } from '@/features/favorites/FavoritesPage';
import { SearchPage } from '@/features/search/SearchPage';
import { ErrorState } from '@/components/feedback/ErrorState';
import { HTTP_ERROR_MAP } from '@/services/error/errorCatalog';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'filmes',
        element: <MoviesPage />
      },
      {
        path: 'series',
        element: <SeriesPage />
      },
      {
        path: 'categorias',
        element: <CategoriesPage />
      },
      {
        path: 'categoria/:slug',
        element: <CategoryDetailPage />
      },
      {
        path: 'canais',
        element: <ChannelsPage />
      },
      {
        path: 'minha-lista',
        element: <FavoritesPage />
      },
      {
        path: 'pesquisa',
        element: <SearchPage />
      },
      {
        path: '*',
        element: (
          <div style={{ padding: 'var(--space-8) 0' }}>
            <ErrorState
              error={HTTP_ERROR_MAP[404]}
              onRetry={() => {
                window.location.href = '/';
              }}
            />
          </div>
        )
      }
    ]
  }
]);
