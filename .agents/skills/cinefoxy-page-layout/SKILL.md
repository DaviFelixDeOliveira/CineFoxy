---
name: cinefoxy-page-layout
description: Estrutura de casca da aplicação, cabeçalho, navegação, grids responsivos e alinhamentos seccionais no CineFoxy.
---

# CineFoxy — Padrão de Layout e Navegação (`AppLayout`)

## 1. Visão Geral
A experiência de navegação do CineFoxy deve ser fluida e imersiva em computadores, celulares e Smart TVs. O layout organiza o conteúdo em seções cinematográficas claras, com trilhos horizontais e grades responsivas.

---

## 2. Componentes Estruturais

### 2.1. Cabeçalho Fixo (`Header`)
- **Logo Oficial:** Imagem carregada obrigatoriamente de `/img/logo.png`, com largura proporcional e link para a página inicial (`/`).
- **Navegação Principal:** Links para `Início`, `Filmes`, `Séries`, `Canais`, `Minha Lista` e `Histórico`. O link ativo recebe sublinhado ou destaque na cor Laranja Fox (`var(--brand-primary)`).
- **Controles Utilitários:** Atalho de Busca (`/pesquisa`) e Seletor Acessível de Tema (Claro, Escuro e Sistema).
- **Comportamento:** Fixo no topo (`position: sticky`), com fundo semitransparente escurecido e `backdrop-filter: blur(12px)`.

### 2.2. Contêiner Principal (`Container`)
- **Largura Máxima:** `1400px` centralizado horizontalmente.
- **Paddings Laterais:**
  - Telas móveis (< 768px): `16px` (`var(--space-4)`).
  - Telas médias (768px - 1024px): `32px` (`var(--space-8)`).
  - Telas grandes e TVs (> 1024px): `48px` (`var(--space-12)`).

### 2.3. Rodapé Institucional (`Footer`)
- Rodapé sóbrio e minimalista contendo a logo em versão discreta, indicação de versão da plataforma e declaração clara de que os metadados são provenientes de fontes públicas e abertas.
- **Regra obrigatória:** Não inventar direitos autorais fictícios, parceiros inexistentes ou dados corporativos inventados.

---

## 3. Grids e Trilhos de Conteúdo
- **Grids de Filmes/Séries (2:3):** `grid-template-columns: repeat(auto-fill, minmax(160px, 1fr))` em mobile até `minmax(200px, 1fr)` em desktop e TV, com espaçamento (`gap`) de `var(--space-4)` a `var(--space-6)`.
- **Grids de Canais (16:9):** `grid-template-columns: repeat(auto-fill, minmax(240px, 1fr))` com gap de `var(--space-4)`.

---

## 4. Checklist de Validação
- [ ] A logo é carregada estritamente de `/img/logo.png`?
- [ ] O menu recolhe adequadamente em telas menores (mobile drawer / menu hamburguer)?
- [ ] Os itens de navegação são acessíveis via teclado (Tab e Enter)?
- [ ] O header mantém legibilidade com fundo borrado ao rolar a página?
- [ ] Os trilhos e seções mantêm alinhamento simétrico com o contêiner central?

---

## 5. Referências
- `docs/architecture/routing.md`
- `docs/design-system/spacing.md`
