---
name: cinefoxy-loading-states
description: Padrões de Skeleton Loading geométrico, prevenção de layout shifts (CLS) e feedback visual de carregamento no CineFoxy.
---

# CineFoxy — Padrão de Estados de Carregamento & Skeleton Loading

## 1. Visão Geral
O CineFoxy adota **Skeleton Loading** como padrão universal de espera visual. Em vez de spinners intrusivos ou telas em branco que quebram a imersão, blocos animados simulam com precisão o formato e as proporções do conteúdo que está prestes a carregar.

---

## 2. Princípios de Implementação

1. **Prevenção de CLS (Cumulative Layout Shift):** O skeleton deve ocupar rigorosamente a mesma altura, largura e proporção do componente final (ex.: 2:3 para pôsteres e 16:9 para canais).
2. **Animação Shimmer Sutil:** Gradiente linear animado horizontalmente (`@keyframes shimmer`), usando `--surface` e `--surface-elevated`.
3. **Respeito a `prefers-reduced-motion`:** Se o usuário solicitou menos movimento, a animação de onda deve ser desativada, mantendo o bloco com opacidade estática suave (`opacity: 0.6`).
4. **Semântica Acessível:** Os elementos de skeleton devem possuir `aria-hidden="true"`, enquanto o contêiner recebe `aria-busy="true"` e rótulo acessível via classe de leitor de tela (`sr-only`).

---

## 3. Componentes de Skeleton Reutilizáveis (`src/components/feedback/`)

### 3.1. `Skeleton` (Bloco Primitivo)
Bloco com dimensões parametrizáveis (`width`, `height`, `borderRadius`) e efeito shimmer.

### 3.2. `PosterSkeleton` (Compatível com `MediaCard`)
- Proporção: `aspect-ratio: 2 / 3`.
- Raio: `var(--radius-md)`.
- Duas barras de texto na parte inferior simulando título e ano.

### 3.3. `ChannelSkeleton` (Compatível com `ChannelCard`)
- Proporção: `aspect-ratio: 16 / 9`.
- Bloco central simulando logo do canal e faixa inferior de programa.

---

## 4. Checklist de Validação
- [ ] O skeleton replica fielmente a geometria do componente carregado?
- [ ] Não ocorre salto de tela (CLS) quando o conteúdo real substitui o skeleton?
- [ ] O componente funciona e mantém contraste nos temas Claro e Escuro?
- [ ] A animação cessa quando `prefers-reduced-motion: reduce` está ativo?
- [ ] O leitor de tela é informado sobre o estado de carregamento sem poluição sonora?

---

## 5. Referências
- `docs/development/loading-states.md`
- Skills dependentes: `cinefoxy-media-cards`, `cinefoxy-channel-cards`
