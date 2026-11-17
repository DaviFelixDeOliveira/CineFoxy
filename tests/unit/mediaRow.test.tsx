import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { MediaRow } from '@/components/sections/MediaRow';
import type { MediaItem } from '@/types/media';

describe('Componente MediaRow', () => {
  const sampleItems: MediaItem[] = [
    { id: '1', title: 'Título 1', overview: '', posterUrl: '', type: 'movie' },
    { id: '2', title: 'Título 2', overview: '', posterUrl: '', type: 'movie' },
    { id: '3', title: 'Título 3', overview: '', posterUrl: '', type: 'movie' },
    { id: '4', title: 'Título 4', overview: '', posterUrl: '', type: 'movie' },
    { id: '5', title: 'Título 5', overview: '', posterUrl: '', type: 'movie' }
  ];

  it('deve ocultar a fileira se contiver menos de 5 títulos válidos', () => {
    const { container } = render(
      <MemoryRouter>
        <MediaRow title="Fileira Vazia" items={sampleItems.slice(0, 3)} />
      </MemoryRouter>
    );

    expect(container.firstChild).toBeNull();
  });

  it('deve renderizar a fileira quando contiver 5 ou mais títulos', () => {
    render(
      <MemoryRouter>
        <MediaRow title="Em Alta" description="Os mais populares" items={sampleItems} />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 2, name: 'Em Alta' })).toBeInTheDocument();
    expect(screen.getByText('Os mais populares')).toBeInTheDocument();
    expect(screen.getByText('Título 1')).toBeInTheDocument();
    expect(screen.getByText('Título 5')).toBeInTheDocument();
  });
});
