import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { MediaCard } from '@/components/cards/MediaCard';
import { ChannelCard } from '@/components/cards/ChannelCard';
import type { MediaItem, ChannelItem } from '@/types/media';

describe('Componentes de Cards (MediaCard & ChannelCard)', () => {
  const mockMovie: MediaItem = {
    id: 'm-1',
    title: 'Raposa Noturna',
    overview: 'Sinopse do filme...',
    posterUrl: 'https://example.com/poster.jpg',
    type: 'movie',
    releaseYear: 2024,
    rating: 8.5,
    genres: ['Ação', 'Suspense']
  };

  const mockChannel: ChannelItem = {
    id: 'ch-1',
    name: 'CineFoxy Ao Vivo',
    logoUrl: '/img/logo.png',
    isLive: true,
    currentProgram: {
      title: 'Festival Especial',
      startTime: '20:00',
      endTime: '22:00'
    }
  };

  describe('MediaCard (Filmes e Séries - 2:3)', () => {
    it('deve renderizar o título, ano, gênero e nota', () => {
      render(<MediaCard item={mockMovie} />);

      expect(screen.getByText('Raposa Noturna')).toBeInTheDocument();
      expect(screen.getByText(/2024/)).toBeInTheDocument();
      expect(screen.getByText(/Ação/)).toBeInTheDocument();
      expect(screen.getByText('★ 8.5')).toBeInTheDocument();
    });

    it('deve disparar evento de clique ao selecionar o card com mouse ou Enter', async () => {
      const handleClick = vi.fn();
      render(<MediaCard item={mockMovie} onClick={handleClick} />);

      const card = screen.getByRole('button', { name: /raposa noturna/i });
      fireEvent.keyDown(card, { key: 'Enter', code: 'Enter' });

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('deve possuir atributo de acessibilidade com o título da obra', () => {
      render(<MediaCard item={mockMovie} />);
      expect(screen.getByRole('button', { name: 'Raposa Noturna (2024)' })).toBeInTheDocument();
    });
  });

  describe('ChannelCard (Canais - 16:9)', () => {
    it('deve renderizar o nome do canal, atração no ar e o indicador AO VIVO', () => {
      render(<ChannelCard channel={mockChannel} />);

      expect(screen.getByText('CineFoxy Ao Vivo')).toBeInTheDocument();
      expect(screen.getByText(/Festival Especial/)).toBeInTheDocument();
      expect(screen.getByText('AO VIVO')).toBeInTheDocument();
    });

    it('deve responder à navegação por teclado em televisores', () => {
      const handleClick = vi.fn();
      render(<ChannelCard channel={mockChannel} onClick={handleClick} />);

      const card = screen.getByRole('button', { name: /canal cinefoxy ao vivo/i });
      fireEvent.keyDown(card, { key: ' ', code: 'Space' });

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
});
