---
name: cinefoxy-design-system
description: Diretrizes de identidade visual, tokens de design, escala espacial e regras de consistência para o CineFoxy.
---

# CineFoxy — Design System & Identidade Visual

## 1. Visão Geral e Princípios
O CineFoxy possui uma identidade cinematográfica moderna, elegante e imersiva inspirada na raposa. O conteúdo (filmes, séries e canais) deve sempre ser o protagonista da interface.

- **Tema base:** Escuro por padrão, com suporte completo a Claro e Modo Sistema.
- **Cor de destaque:** Laranja Fox (`#FF5722`), utilizado com parcimônia em ações prioritárias, indicadores ativos e estados de foco.
- **Tipografia:** `Inter`, com fallbacks para fontes do sistema (`system-ui, -apple-system, sans-serif`).
- **Sistema de medidas:** Escala estrita baseada em múltiplos de 4px.
- **Estratégia de Estilo:** CSS nativo com Custom Properties para tokens globais e CSS Modules (`.module.css`) para escopo de componentes. **Nunca use cores hexadecimais soltas ou bibliotecas CSS-in-JS.**

---

## 2. Tokens de Design Globais

### 2.1. Cores da Marca (Brand Palette)
- `--brand-primary`: `#FF5722` (Laranja Fox - Cor principal)
- `--brand-hover`: `#FF7A00` (Laranja vivo - Hover)
- `--brand-active`: `#C83D18` (Laranja profundo - Clique/Ativo)
- `--brand-soft`: `#FF9E40` (Laranja suave - Realces e detalhes)
- `--brand-contrast`: `#FFFFFF` (Texto com alto contraste sobre o Laranja Fox)

### 2.2. Escala de Espaçamento (4px Base)
- `--space-1`: `4px`
- `--space-2`: `8px`
- `--space-3`: `12px`
- `--space-4`: `16px`
- `--space-5`: `20px`
- `--space-6`: `24px`
- `--space-8`: `32px`
- `--space-10`: `40px`
- `--space-12`: `48px`
- `--space-16`: `64px`

### 2.3. Raios de Borda (Border Radius)
- `--radius-sm`: `4px` (Badges e tags)
- `--radius-md`: `8px` (Botões, cards e campos)
- `--radius-lg`: `12px` (Modais e banners)
- `--radius-full`: `9999px` (Pílulas e botões circulares)

### 2.4. Transições e Animações
- `--transition-fast`: `150ms ease-out`
- `--transition-normal`: `250ms ease-out`
- **Regra obrigatória:** Todo efeito com transição deve respeitar `@media (prefers-reduced-motion: reduce)`.

---

## 3. Regras Obrigatórias de Desenvolvimento
1. **Consumo de Tokens:** Nenhum componente pode ter cores `#hex` ou `rgb()` fixas no código CSS Module. Utilize sempre variáveis semânticas como `var(--surface)`, `var(--text-primary)`, `var(--brand-primary)`.
2. **Consistência de Componentes:** Antes de criar um elemento visual, verifique se já existe um componente em `src/components/ui/` ou `src/components/cards/`.
3. **Contraste WCAG AA:** O texto principal deve manter taxa de contraste mínima de 4.5:1 com o fundo em todos os temas.
4. **Foco Visível:** Todos os elementos interativos devem possuir contorno de foco de 2px na cor `var(--focus-ring)` com `outline-offset: 2px`.

---

## 4. Checklist de Validação
- [ ] O componente consome apenas variáveis CSS semânticas?
- [ ] O espaçamento e padding utilizam valores múltiplos de 4px?
- [ ] As transições respeitam `prefers-reduced-motion`?
- [ ] O contraste atende a WCAG AA nos temas Claro e Escuro?
- [ ] O foco pelo teclado/controle remoto está visível e nítido?

---

## 5. Referências Oficiais
- `docs/design-system/colors.md`
- `docs/design-system/typography.md`
- `docs/design-system/spacing.md`
- `docs/design-system/components.md`
