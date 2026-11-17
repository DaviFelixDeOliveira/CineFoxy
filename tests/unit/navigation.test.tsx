import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { Header } from '@/components/layout/Header';
import { ThemeProvider } from '@/app/providers/ThemeProvider';

describe('Navegação e Header (Desktop e Mobile Menu)', () => {
  const renderHeader = () => {
    return render(
      <MemoryRouter>
        <ThemeProvider>
          <Header />
        </ThemeProvider>
      </MemoryRouter>
    );
  };

  it('deve renderizar a logo oficial do CineFoxy e o link da Home', () => {
    renderHeader();
    const logoImg = screen.getByAltText('CineFoxy Logo');
    expect(logoImg).toBeInTheDocument();
    expect(logoImg).toHaveAttribute('src', '/img/logo.png');
  });

  it('deve conter os itens oficiais de navegação (Início, Filmes, Séries, Categorias, Canais, Minha Lista)', () => {
    renderHeader();
    expect(screen.getAllByText('Início')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Filmes')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Séries')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Categorias')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Canais')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Minha Lista')[0]).toBeInTheDocument();
  });

  it('deve abrir o drawer móvel ao clicar no botão hambúrguer com semântica de diálogo', () => {
    renderHeader();
    const burgerBtn = screen.getByRole('button', { name: /abrir menu de navegação/i });
    expect(burgerBtn).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(burgerBtn);

    expect(burgerBtn).toHaveAttribute('aria-expanded', 'true');
    const drawer = screen.getByRole('dialog', { name: /menu de navegação principal/i });
    expect(drawer).toBeInTheDocument();
    expect(drawer).toHaveAttribute('aria-modal', 'true');
  });

  it('deve fechar o drawer móvel ao pressionar Escape', () => {
    renderHeader();
    const burgerBtn = screen.getByRole('button', { name: /abrir menu de navegação/i });
    fireEvent.click(burgerBtn);

    const drawer = screen.getByRole('dialog');
    expect(drawer).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'Escape', code: 'Escape' });
    expect(burgerBtn).toHaveAttribute('aria-expanded', 'false');
  });
});
