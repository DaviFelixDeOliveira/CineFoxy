import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { AppLayout } from '@/components/layout/AppLayout';
import { ThemeProvider } from '@/app/providers/ThemeProvider';

describe('AppLayout e Transições Globais', () => {
  it('deve renderizar o cabeçalho, rodapé e conteúdo de rota com wrapper animado', () => {
    render(
      <ThemeProvider>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<div data-testid="home-content">Conteúdo Home</div>} />
            </Route>
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    );

    expect(screen.getByAltText('CineFoxy Logo')).toBeInTheDocument();
    expect(screen.getByTestId('home-content')).toBeInTheDocument();
    expect(screen.getByText(/plataforma de entretenimento audiovisual/i)).toBeInTheDocument();
  });
});
