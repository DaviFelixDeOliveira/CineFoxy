# CineFoxy — Padrões de Interações, Animações e Movimento

## 1. Princípios de Movimento
O movimento no CineFoxy deve ser discreto, cinematográfico e fluido. As animações têm a função exclusiva de orientar a atenção do usuário e fornecer feedback tátil/visual imediato.

---

## 2. Tempos e Curvas de Transição

```css
--transition-fast: 150ms cubic-bezier(0.16, 1, 0.3, 1);
--transition-normal: 250ms cubic-bezier(0.16, 1, 0.3, 1);
--transition-slow: 400ms cubic-bezier(0.16, 1, 0.3, 1);
```

- **150ms:** Efeitos de hover em botões, links de menu e mudanças de cor de borda.
- **250ms:** Elevação de cartazes de filmes/séries e abertura de menus suspensos.
- **400ms:** Transições entre páginas e esmaecimento de banners.

---

## 3. Diretriz Obrigatória: `prefers-reduced-motion`

Usuários com sensibilidade vestibular ou que ativam redução de movimento no sistema operacional devem ter todas as transformações espaciais (deslocamentos, ampliações de escala e ondas de shimmer) desativadas:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 4. Comportamento de Foco em Televisores
- O anel de foco `:focus-visible` deve aparecer instantaneamente sem delay (`transition: none` no foco), permitindo que a navegação com controle remoto responda com máxima agilidade e sem perda de contexto espacial.
