---
name: cinefoxy-api-integration
description: Diretrizes de arquitetura para integração de APIs de catálogo (TMDB e TVmaze), adaptadores de dados e contratos internos.
---

# CineFoxy — Diretrizes de Integração de APIs e Catálogo

## 1. Visão Geral
No CineFoxy, as fontes externas de dados (como TMDB para filmes e TVmaze para séries) **nunca** conversam diretamente com a camada de visualização. Toda integração deve passar por uma camada de abstração com adaptadores que normalizam os dados para modelos internos unificados (`MediaItem`, `ChannelItem`).

---

## 2. Princípios de Arquitetura

1. **Desacoplamento de Schemas:** A estrutura de dados dos componentes da interface é soberana. Se a API do TMDB alterar nomes de campos (ex.: `original_title` vs `title`), apenas o adaptador correspondente é modificado.
2. **Normalização Obrigatória:** O adaptador deve tratar campos nulos, URLs de imagem incompletas, datas ausentes e converter notas para a escala padronizada (0 a 10).
3. **Estratégia de Cache TTL:** Respostas de catálogo devem ser armazenadas em cache com tempo de vida definido:
   - Destaques da Home: 1 hora de TTL.
   - Detalhes de títulos: 24 horas de TTL.
   - Resultados de busca: 15 minutos de TTL.
4. **Cancelamento com AbortController:** Toda requisição assíncrona associada a efeitos React ou digitação na pesquisa deve suportar cancelamento para evitar condições de corrida (*race conditions*).

---

## 3. Modelo Interno Padronizado (`src/types/media.ts`)

```typescript
export type MediaType = 'movie' | 'series' | 'channel';

export interface MediaItem {
  id: string;
  title: string;
  overview: string;
  posterUrl: string;
  backdropUrl?: string;
  type: MediaType;
  releaseYear?: number;
  rating?: number; // 0 a 10
  genres?: string[];
}
```

---

## 4. Checklist de Validação
- [ ] Os componentes de UI dependem exclusivamente dos tipos internos (`MediaItem`)?
- [ ] O adaptador trata graciosamente dados parciais ou ausentes?
- [ ] Chaves de API não estão embutidas no código fonte?
- [ ] As requisições suportam `AbortController` para cancelamento limpo?

---

## 5. Referências
- `docs/architecture/data-model.md`
- `docs/api/catalog.md`
- `docs/api/caching.md`
