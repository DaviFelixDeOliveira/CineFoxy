import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { HeroBanner } from '@/components/banners/HeroBanner';

describe('Componente HeroBanner', () => {
  it('deve renderizar o título CINEFOXY e o subtítulo oficial', () => {
    render(
      <MemoryRouter>
        <HeroBanner />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1, name: /cinefoxy/i })).toBeInTheDocument();
    expect(screen.getByText(/seu universo de entretenimento/i)).toBeInTheDocument();
    expect(screen.getByText('UNIVERSO CINEFOXY')).toBeInTheDocument();
  });

  it('deve conter os botões de exploração para Filmes e Séries', () => {
    render(
      <MemoryRouter>
        <HeroBanner />
      </MemoryRouter>
    );

    const exploreMovies = screen.getByRole('button', { name: /explorar filmes/i });
    const exploreSeries = screen.getByRole('button', { name: /explorar séries/i });

    expect(exploreMovies).toBeInTheDocument();
    expect(exploreSeries).toBeInTheDocument();
  });
});
