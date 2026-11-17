import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { AnimatedPosterWall } from '@/components/banners/AnimatedPosterWall';
import { PosterColumn } from '@/components/banners/PosterColumn';
import { HeroBanner } from '@/components/banners/HeroBanner';

describe('AnimatedPosterWall & PosterColumn (Movimento Vertical Contínuo)', () => {
  it('deve renderizar 6 colunas no AnimatedPosterWall com direções alternadas e velocidades independentes', () => {
    const { container } = render(<AnimatedPosterWall />);

    const tracks = Array.from(container.querySelectorAll<HTMLElement>('[class*="track"]'));
    expect(tracks.length).toBe(6);

    const durations = tracks.map((el) => el.style.animationDuration);
    const uniqueDurations = new Set(durations);
    expect(uniqueDurations.size).toBe(6);

    // Verifica direções alternadas (up, down, up, down, up, down)
    tracks.forEach((track, idx) => {
      if (idx % 2 === 0) {
        expect(track.className).toMatch(/up/);
      } else {
        expect(track.className).toMatch(/down/);
      }
    });
  });

  it('deve duplicar os grupos de pôsteres em cada PosterColumn para loop contínuo sem saltos', () => {
    const images = ['/a.jpg', '/b.jpg', '/c.jpg'];
    const { container } = render(
      <PosterColumn images={images} direction="up" durationSeconds={30} />
    );

    const groups = container.querySelectorAll('[class*="group"]');
    expect(groups.length).toBe(2);

    const posters = container.querySelectorAll('img');
    expect(posters.length).toBe(images.length * 2);
  });

  it('deve definir keyframes translateY e regra prefers-reduced-motion no CSS do PosterColumn', () => {
    const cssPath = path.resolve(process.cwd(), 'src/components/banners/PosterColumn.module.css');
    const cssContent = fs.readFileSync(cssPath, 'utf-8');

    expect(cssContent).toContain('@keyframes scrollUp');
    expect(cssContent).toContain('@keyframes scrollDown');
    expect(cssContent).toContain('translateY(0%)');
    expect(cssContent).toContain('translateY(-50%)');
    expect(cssContent).toContain('@media (prefers-reduced-motion: reduce)');
    expect(cssContent).toContain('animation: none !important');
  });

  it('deve manter os pôsteres e o conteúdo principal legíveis dentro do HeroBanner', () => {
    const { container, getByRole } = render(
      <MemoryRouter>
        <HeroBanner />
      </MemoryRouter>
    );

    expect(container.querySelectorAll('[class*="track"]').length).toBe(6);
    expect(getByRole('heading', { level: 1, name: /cinefoxy/i })).toBeInTheDocument();
    expect(getByRole('button', { name: /explorar filmes/i })).toBeInTheDocument();
  });
});
