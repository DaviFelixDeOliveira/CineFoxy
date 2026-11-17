# CineFoxy — Arquitetura de Integração de Catálogo (TMDB)

## 1. Visão Geral
*Documento atualizado na Etapa 3.2 (Infraestrutura Segura).*

O CineFoxy utilizará o **TMDB (The Movie Database)** como fonte única dos catálogos na Fase 3, por meio do proxy seguro `/api/catalog` (`netlify/functions/catalog.ts`).

**Escopo TVmaze:** O TVmaze está **fora do escopo da Fase 3 atual**. Nenhuma chamada, adaptador ou dependência do TVmaze é implementado nesta fase; eventual integração complementar para temporadas/episódios pertence às fases posteriores.

---

## 2. Contratos de Adaptador (Etapas 3.3+)

Os futuros adaptadores implementarão contratos internos desacoplados dos schemas externos:
```typescript
export interface CatalogProvider {
  name: string;
  getTrendingMovies(): Promise<MediaItem[]>;
  getTrendingSeries(): Promise<MediaItem[]>;
  search(query: string): Promise<MediaItem[]>;
  getDetails(id: string, type: MediaType): Promise<MediaItem>;
}
```

---

## 3. Critérios Editoriais Registrados (Para Etapas 3.3 / 3.6)
- **Joias Escondidas — Filmes:** Nota mínima `7.6`; votos iniciais `150` (máx. 2 flexibilizações de 10%: `135` -> `120`); popularidade moderada obrigatória com teto provisório `popularity <= 35` (calibrado uma única vez na Etapa 3.3); excluir IDs de *Em Alta*; ocultar se `< 5` títulos válidos.
- **Joias Escondidas — Séries:** Nota mínima `7.8`; votos iniciais `100` (máx. 2 flexibilizações de 10%: `90` -> `80`); popularidade moderada obrigatória com teto provisório `popularity <= 45` (calibrado uma única vez na Etapa 3.3); excluir IDs de *Em Alta*; ocultar se `< 5` títulos válidos.
- **Atribuição TMDB (etapa posterior no Footer):** Incorporar ao `Footer` existente o texto oficial `"This product uses the TMDB API but is not endorsed or certified by TMDB."`, logotipo oficial aprovado do TMDB e link oficial, sem página exclusiva de créditos.
