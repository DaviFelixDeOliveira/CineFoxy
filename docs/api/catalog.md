# CineFoxy — Arquitetura de Integração de Catálogo (TMDB e TVmaze)

## 1. Visão Geral
*Documento de planejamento arquitetural para a Fase 3.*

O CineFoxy utilizará o **TMDB (The Movie Database)** como fonte primária de metadados para filmes e séries e o **TVmaze** como fonte secundária e complementar de informações para grades de episódios e séries.

---

## 2. Contratos de Adaptador

Todo adaptador implementará uma interface comum:
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

## 3. Desacoplamento e Fallback
Se uma chamada a um provedor secundário falhar, o provedor primário assume a responsabilidade sem que a interface do usuário seja interrompida.
