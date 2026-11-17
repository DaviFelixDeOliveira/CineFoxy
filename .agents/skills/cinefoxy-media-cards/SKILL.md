---
name: cinefoxy-media-cards
description: Padronização de cartazes verticais de filmes e séries, proporção 2:3, metadados e alinhamento no CineFoxy.
---

# CineFoxy — Padrão de Cards de Filmes e Séries (`MediaCard`)

## 1. Visão Geral
O componente `MediaCard` é o formato universal de exibição de filmes e séries em grades e carrosséis. Ele deve respeitar proporções geométricas rígidas para evitar oscilações de layout (Cumulative Layout Shift) e garantir alinhamento perfeito dos títulos.

---

## 2. Especificação Geométrica e Visual

- **Proporção da Imagem:** Exatamente **2:3** (`aspect-ratio: 2 / 3`).
- **Arredondamento:** Cantos de 8px (`border-radius: var(--radius-md)`).
- **Tratamento de Imagem:** `object-fit: cover`, com fundo neutro (`var(--surface)`) enquanto a imagem carrega.
- **Transição de Hover:** Elevação suave (`transform: translateY(-4px)`) com sombra difusa (`box-shadow: var(--shadow-md)`) em `200ms ease-out`. Respeita `prefers-reduced-motion`.
- **Foco por Teclado/TV:** Contorno de foco `2px solid var(--focus-ring)` com deslocamento de `2px`.

---

## 3. Hierarquia de Informações

```text
+-----------------------+
|                       |
|   Cartaz 2:3          |
|   [Badge Nota/Tipo]   |
|                       |
+-----------------------+
| Título do Filme (max  |
| 2 linhas alinhadas)   |
| Ano • Gênero / Tipo   |
+-----------------------+
```

1. **Badge Superior (Opcional):** Classificação indicativa ou nota de avaliação fixada no canto superior.
2. **Título da Obra:** Tipografia de peso 600, truncamento obrigatório em no máximo 2 linhas (`display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;`). A altura do contêiner de título deve ser padronizada para manter os metadados inferiores alinhados em toda a grade.
3. **Metadados:** Ano de lançamento e categoria exibidos em texto secundário (`var(--text-secondary)`).

---

## 4. Checklist de Validação
- [ ] A proporção da área do pôster é rigorosamente 2:3?
- [ ] Títulos longos são truncados em 2 linhas sem empurrar o card para baixo?
- [ ] O componente funciona de forma idêntica na Home e na página de Filmes/Séries?
- [ ] A imagem possui atributo `loading="lazy"` para economia de banda?
- [ ] O Skeleton correspondente (`PosterSkeleton`) possui as mesmas dimensões para evitar CLS?

---

## 5. Referências
- `docs/design-system/components.md`
- Skills dependentes: `cinefoxy-design-system`, `cinefoxy-loading-states`
