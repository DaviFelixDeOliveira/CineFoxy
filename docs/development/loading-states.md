# CineFoxy — Padrões de Skeleton Loading e Estados de Espera

## 1. Visão Geral
O Skeleton Loading simula o conteúdo final antes de os dados reais estarem disponíveis, reduzindo a percepção de espera do usuário e garantindo que o layout permaneça estável sem oscilações bruscas (Cumulative Layout Shift - CLS).

---

## 2. Anatomia dos Skeletons

### 2.1. Cartaz de Filmes e Séries (`PosterSkeleton`)
- Proporção estrita de `2 / 3` na área da imagem.
- Altura reservada para o bloco de texto inferior (título em 2 linhas + linha de ano/gênero).
- Animação horizontal de gradiente (`shimmer`).

### 2.2. Card de Canal (`ChannelSkeleton`)
- Proporção estrita de `16 / 9`.
- Espaço central reservado para a logo do canal.
- Faixa inferior simulando o programa em exibição.

---

## 3. Acessibilidade
- Elementos visuais de skeleton recebem `aria-hidden="true"`.
- O contêiner pai recebe `aria-busy="true"` enquanto o carregamento persistir.
- Usuários com `@media (prefers-reduced-motion: reduce)` recebem uma apresentação estática sem animação de brilho.
