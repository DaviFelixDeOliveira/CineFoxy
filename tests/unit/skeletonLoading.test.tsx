import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, it, expect, beforeEach } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { Skeleton } from '@/components/feedback/Skeleton';
import { TextSkeleton } from '@/components/feedback/TextSkeleton';
import { PosterSkeleton } from '@/components/feedback/PosterSkeleton';
import { MediaCardSkeleton } from '@/components/feedback/MediaCardSkeleton';
import { ChannelSkeleton } from '@/components/feedback/ChannelSkeleton';
import { CategoryCardSkeleton } from '@/components/feedback/CategoryCardSkeleton';
import { HeroSkeleton } from '@/components/feedback/HeroSkeleton';
import { MediaRowSkeleton } from '@/components/feedback/MediaRowSkeleton';
import { MediaGridSkeleton } from '@/components/feedback/MediaGridSkeleton';
import { CategoryGridSkeleton } from '@/components/feedback/CategoryGridSkeleton';
import {
  ContinueWatchingSkeleton,
  ContinueWatchingSectionSkeleton
} from '@/components/feedback/ContinueWatchingSkeleton';
import { EpisodeSkeleton } from '@/components/feedback/EpisodeSkeleton';
import { DetailsSkeleton, PlayerSkeleton } from '@/components/feedback/DetailsSkeleton';
import { SearchResultsSkeleton } from '@/components/feedback/SearchResultsSkeleton';
import { PageLoading } from '@/components/feedback/PageLoading';

import { HomePage } from '@/features/home/HomePage';
import { MoviesPage } from '@/features/movies/MoviesPage';
import { SeriesPage } from '@/features/series/SeriesPage';
import { CategoriesPage } from '@/features/categories/CategoriesPage';
import { CategoryDetailPage } from '@/features/categories/CategoryDetailPage';
import { FavoritesPage } from '@/features/favorites/FavoritesPage';
import { ChannelsPage } from '@/features/channels/ChannelsPage';
import { SearchPage } from '@/features/search/SearchPage';
import { HistoryPage } from '@/features/history/HistoryPage';

describe('Sistema Global de Skeleton Loading e Estados de Carregamento', () => {
  beforeEach(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
  });

  it('deve renderizar todos os componentes reutilizáveis de Skeleton com semântica acessível', () => {
    const { container } = render(
      <div>
        <Skeleton width={120} height={20} />
        <TextSkeleton lines={3} />
        <PosterSkeleton />
        <MediaCardSkeleton />
        <ChannelSkeleton />
        <CategoryCardSkeleton />
        <HeroSkeleton />
        <MediaRowSkeleton />
        <MediaGridSkeleton count={5} />
        <CategoryGridSkeleton count={4} />
        <ContinueWatchingSkeleton />
        <ContinueWatchingSectionSkeleton count={2} />
        <EpisodeSkeleton />
        <DetailsSkeleton variant="series" />
        <PlayerSkeleton />
        <SearchResultsSkeleton />
      </div>
    );

    expect(container.querySelectorAll('[aria-busy="true"]').length).toBeGreaterThan(10);
    expect(container.querySelectorAll('[aria-hidden="true"]').length).toBeGreaterThan(10);
  });

  it('deve preservar proporções 2:3 para pôsteres e 16:9 para canais e categorias nos CSS Modules', () => {
    const skelCss = fs.readFileSync(
      path.resolve(process.cwd(), 'src/components/feedback/Skeleton.module.css'),
      'utf-8'
    );
    const channelCss = fs.readFileSync(
      path.resolve(process.cwd(), 'src/components/feedback/ChannelSkeleton.module.css'),
      'utf-8'
    );
    const catCss = fs.readFileSync(
      path.resolve(process.cwd(), 'src/components/feedback/CategoryCardSkeleton.module.css'),
      'utf-8'
    );

    expect(skelCss).toContain('aspect-ratio: 2 / 3');
    expect(channelCss).toContain('aspect-ratio: 16 / 9');
    expect(catCss).toContain('aspect-ratio: 16 / 9');
  });

  it('deve desativar animação shimmer quando prefers-reduced-motion: reduce estiver ativo', () => {
    const skelCss = fs.readFileSync(
      path.resolve(process.cwd(), 'src/components/feedback/Skeleton.module.css'),
      'utf-8'
    );

    expect(skelCss).toContain('@media (prefers-reduced-motion: reduce)');
    expect(skelCss).toContain('animation: none !important');
    expect(skelCss).toContain('background-image: none');
  });

  it('deve ser compatível com Tema Claro e Tema Escuro via tokens semânticos', () => {
    const themesCss = fs.readFileSync(
      path.resolve(process.cwd(), 'src/styles/themes.css'),
      'utf-8'
    );
    expect(themesCss).toContain('--skeleton-base');
    expect(themesCss).toContain('--skeleton-highlight');

    const { rerender } = render(
      <ThemeProvider>
        <MemoryRouter>
          <HomePage forcedStatus="loading" />
        </MemoryRouter>
      </ThemeProvider>
    );

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(screen.getByText(/carregando conteúdo da página/i)).toBeInTheDocument();

    document.documentElement.setAttribute('data-theme', 'light');
    rerender(
      <ThemeProvider>
        <MemoryRouter>
          <HomePage forcedStatus="loading" />
        </MemoryRouter>
      </ThemeProvider>
    );

    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(screen.getByText(/carregando conteúdo da página/i)).toBeInTheDocument();
  });

  it('deve substituir o Skeleton pelo conteúdo real ao transicionar de loading para success', () => {
    const { rerender } = render(
      <MemoryRouter>
        <MoviesPage forcedStatus="loading" />
      </MemoryRouter>
    );

    expect(screen.getByText(/carregando conteúdo da página/i)).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /catálogo de filmes/i })).not.toBeInTheDocument();

    rerender(
      <MemoryRouter>
        <MoviesPage forcedStatus="success" />
      </MemoryRouter>
    );

    expect(screen.queryByText(/carregando conteúdo da página/i)).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /catálogo de filmes/i })).toBeInTheDocument();
  });

  it('deve exibir EmptyState (e nunca skeleton infinito) quando a lista estiver vazia após carregamento', () => {
    render(
      <MemoryRouter>
        <FavoritesPage forcedStatus="empty" />
      </MemoryRouter>
    );
    expect(screen.getByText(/sua lista ainda está vazia/i)).toBeInTheDocument();
    expect(screen.queryByText(/carregando conteúdo da página/i)).not.toBeInTheDocument();

    render(
      <MemoryRouter>
        <ChannelsPage />
      </MemoryRouter>
    );
    expect(screen.getByText(/nenhum canal cadastrado/i)).toBeInTheDocument();
  });

  it('deve exibir ErrorState e OfflineState corretamente em falhas e ausência de conexão', () => {
    const { rerender } = render(
      <MemoryRouter>
        <SeriesPage forcedStatus="error" />
      </MemoryRouter>
    );
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText(/não foi possível carregar o conteúdo/i)).toBeInTheDocument();

    rerender(
      <MemoryRouter>
        <SeriesPage forcedStatus="offline" />
      </MemoryRouter>
    );
    expect(screen.getByText(/você está sem conexão/i)).toBeInTheDocument();
  });

  it('deve integrar Skeletons em todas as páginas existentes incluindo CategoryDetailPage com cor do gênero', () => {
    const pages = [
      <HomePage key="home" forcedStatus="loading" />,
      <MoviesPage key="movies" forcedStatus="loading" />,
      <SeriesPage key="series" forcedStatus="loading" />,
      <CategoriesPage key="cats" forcedStatus="loading" />,
      <FavoritesPage key="favs" forcedStatus="loading" />,
      <ChannelsPage key="chans" forcedStatus="loading" />,
      <HistoryPage key="hist" forcedStatus="loading" />
    ];

    pages.forEach((pageEl) => {
      const { unmount } = render(<MemoryRouter>{pageEl}</MemoryRouter>);
      expect(screen.getByText(/carregando conteúdo da página/i)).toBeInTheDocument();
      unmount();
    });

    // SearchPage mantém campo de pesquisa utilizável durante o loading
    render(
      <MemoryRouter>
        <SearchPage forcedStatus="loading" />
      </MemoryRouter>
    );
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    expect(screen.getByText(/buscando títulos no catálogo/i)).toBeInTheDocument();

    // CategoryDetailPage preserva cor oficial do gênero no skeleton
    const { container } = render(
      <MemoryRouter initialEntries={['/categoria/acao']}>
        <Routes>
          <Route path="/categoria/:slug" element={<CategoryDetailPage forcedStatus="loading" />} />
        </Routes>
      </MemoryRouter>
    );
    const headerSkeleton = container.querySelector('[class*="categoryHeader"]') as HTMLElement;
    expect(headerSkeleton).toBeTruthy();
    expect(headerSkeleton.style.borderColor).toContain('239, 83, 80');
  });

  it('deve suportar PageLoading em modo details para futuras telas de detalhes', () => {
    render(<PageLoading variant="details" detailsVariant="series" />);
    expect(screen.getByText(/carregando detalhes do título/i)).toBeInTheDocument();
  });
});
