import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ThemeProvider, useTheme } from '@/app/providers/ThemeProvider';
import { themeStorage } from '@/storage/themeStorage';

const ThemeConsumer: React.FC = () => {
  const { theme, resolvedTheme, setTheme } = useTheme();

  return (
    <div>
      <span data-testid="current-theme">{theme}</span>
      <span data-testid="resolved-theme">{resolvedTheme}</span>
      <button onClick={() => setTheme('light')}>Mudar para Claro</button>
      <button onClick={() => setTheme('dark')}>Mudar para Escuro</button>
      <button onClick={() => setTheme('system')}>Mudar para Sistema</button>
    </div>
  );
};

describe('ThemeProvider & Sistema de Temas', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('deve inicializar com o tema do sistema ou escuro por padrão', () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('system');
    // Como nosso mock de matchMedia em setup.ts retorna matches: true para dark:
    expect(screen.getByTestId('resolved-theme')).toHaveTextContent('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('deve alternar para o tema claro ao solicitar e persistir no storage', () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText('Mudar para Claro'));

    expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
    expect(screen.getByTestId('resolved-theme')).toHaveTextContent('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(themeStorage.getTheme()).toBe('light');
  });

  it('deve alternar para o tema escuro ao solicitar e persistir no storage', () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText('Mudar para Claro'));
    fireEvent.click(screen.getByText('Mudar para Escuro'));

    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
    expect(screen.getByTestId('resolved-theme')).toHaveTextContent('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(themeStorage.getTheme()).toBe('dark');
  });

  it('deve carregar a preferência persistida previamente no localStorage', () => {
    themeStorage.setTheme('light');

    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
    expect(screen.getByTestId('resolved-theme')).toHaveTextContent('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('deve operar com resiliência sem quebrar caso localStorage lance erro', () => {
    const getItemSpy = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('Cota restrita');
    });

    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );

    expect(screen.getByTestId('current-theme')).toBeInTheDocument();
    getItemSpy.mockRestore();
  });
});
