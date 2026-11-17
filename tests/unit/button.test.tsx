import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from '@/components/ui/Button';

describe('Componente Button', () => {
  it('deve renderizar o texto do botão corretamente', () => {
    render(<Button>Assistir Agora</Button>);
    expect(screen.getByRole('button', { name: /assistir agora/i })).toBeInTheDocument();
  });

  it('deve disparar evento de clique quando habilitado', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Clique Aqui</Button>);

    fireEvent.click(screen.getByRole('button', { name: /clique aqui/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('não deve disparar clique quando disabled', () => {
    const handleClick = vi.fn();
    render(
      <Button disabled onClick={handleClick}>
        Desabilitado
      </Button>
    );

    const btn = screen.getByRole('button', { name: /desabilitado/i });
    expect(btn).toBeDisabled();

    fireEvent.click(btn);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('deve exibir indicador de carregamento e bloquear interação quando isLoading=true', () => {
    const handleClick = vi.fn();
    render(
      <Button isLoading onClick={handleClick}>
        Carregando Conteúdo
      </Button>
    );

    const btn = screen.getByRole('button');
    expect(btn).toHaveAttribute('aria-busy', 'true');
    expect(btn).toBeDisabled();

    fireEvent.click(btn);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('deve renderizar classes das variantes corretamente', () => {
    const { rerender } = render(<Button variant="primary">Primário</Button>);
    expect(screen.getByRole('button')).toHaveClass(/primary/);

    rerender(<Button variant="secondary">Secundário</Button>);
    expect(screen.getByRole('button')).toHaveClass(/secondary/);

    rerender(<Button variant="destructive">Destrutivo</Button>);
    expect(screen.getByRole('button')).toHaveClass(/destructive/);
  });

  it('deve suportar tamanho lg com área confortável para Smart TV e mobile', () => {
    render(<Button size="lg">Botão TV</Button>);
    expect(screen.getByRole('button')).toHaveClass(/lg/);
  });
});
