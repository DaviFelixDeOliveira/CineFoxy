import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { CategoryCard } from '@/components/cards/CategoryCard';
import { CINEFOXY_CATEGORIES } from '@/types/category';
import { GENRE_COLORS, getGenreColor, getGenreGradient } from '@/app/config/genreColors';

describe('Categorias e Genre Color System', () => {
  it('deve possuir exatamente 17 categorias de gêneros mapeadas', () => {
    expect(CINEFOXY_CATEGORIES).toHaveLength(17);
  });

  it('deve conter as 17 cores oficiais configuradas no Genre Color System', () => {
    expect(Object.keys(GENRE_COLORS)).toHaveLength(17);

    // 12 cores originais aprovadas
    expect(GENRE_COLORS.acao.hex).toBe('#EF5350');
    expect(GENRE_COLORS.aventura.hex).toBe('#E58A39');
    expect(GENRE_COLORS.comedia.hex).toBe('#E6B83F');
    expect(GENRE_COLORS.romance.hex).toBe('#E879A9');
    expect(GENRE_COLORS.terror.hex).toBe('#A16AC7');
    expect(GENRE_COLORS.suspense.hex).toBe('#718096');
    expect(GENRE_COLORS['ficcao-cientifica'].hex).toBe('#36B7C8');
    expect(GENRE_COLORS.fantasia.hex).toBe('#9272D0');
    expect(GENRE_COLORS.drama.hex).toBe('#6684C6');
    expect(GENRE_COLORS.animacao.hex).toBe('#4CA77C');
    expect(GENRE_COLORS.documentario.hex).toBe('#65A6A0');
    expect(GENRE_COLORS.musical.hex).toBe('#D47BA8');

    // 5 novas cores complementares aprovadas
    expect(GENRE_COLORS.misterio.hex).toBe('#5C6BC0');
    expect(GENRE_COLORS.crime.hex).toBe('#9E2A2B');
    expect(GENRE_COLORS.familia.hex).toBe('#F4A261');
    expect(GENRE_COLORS.guerra.hex).toBe('#6B705C');
    expect(GENRE_COLORS.historia.hex).toBe('#A98467');
  });

  it('deve retornar a cor correta ao buscar por slug ou nome com acentuação', () => {
    expect(getGenreColor('Ação').hex).toBe('#EF5350');
    expect(getGenreColor('ficcao-cientifica').hex).toBe('#36B7C8');
    expect(getGenreColor('Mistério').hex).toBe('#5C6BC0');
    expect(getGenreColor('Guerra').hex).toBe('#6B705C');
    expect(getGenreColor('musica').hex).toBe('#D47BA8');
    expect(getGenreColor('Música').hex).toBe('#D47BA8');
    expect(getGenreColor('musical').hex).toBe('#D47BA8');
    expect(getGenreColor('inexistente').hex).toBe('#FF5722'); // Fallback institucional Fox
  });

  it('deve gerar gradiente cinematográfico para o card com base no gênero', () => {
    const gradient = getGenreGradient('acao');
    expect(gradient).toContain('239, 83, 80');
    expect(gradient).toContain('linear-gradient');

    const musicGradient = getGenreGradient('musica');
    expect(musicGradient).toContain('212, 123, 168');
  });

  it('deve renderizar o CategoryCard como link nativo acessível apontando para /categoria/:slug', () => {
    const sampleCategory = CINEFOXY_CATEGORIES[0]; // Ação

    render(
      <MemoryRouter>
        <CategoryCard category={sampleCategory} />
      </MemoryRouter>
    );

    const link = screen.getByRole('link', { name: /explorar categoria ação/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/categoria/acao');
    expect(screen.getByText('Ação')).toBeInTheDocument();
    expect(screen.getByText('Gênero')).toBeInTheDocument();
  });
});
