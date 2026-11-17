# CineFoxy — Modelo de Dados Interno

## 1. Visão Geral
Para garantir que o CineFoxy não fique acoplado à estrutura de retorno das APIs do TMDB ou TVmaze, definimos contratos de tipos TypeScript próprios que governam todas as entidades do sistema.

---

## 2. Entidades Principais (`src/types/media.ts`)

### 2.1. Item de Mídia Universal (`MediaItem`)
```typescript
export type MediaType = 'movie' | 'series' | 'channel';

export interface MediaItem {
  id: string;               // Identificador interno unificado (ex: 'movie-550')
  title: string;            // Título formatado em português
  originalTitle?: string;   // Título no idioma original
  overview: string;         // Sinopse
  posterUrl: string;        // URL do cartaz em proporção 2:3
  backdropUrl?: string;     // URL da imagem de fundo cinematográfica
  type: MediaType;          // 'movie' | 'series' | 'channel'
  releaseYear?: number;     // Ano de lançamento (ex: 2024)
  rating?: number;          // Nota normalizada de 0.0 a 10.0
  durationMinutes?: number; // Duração para filmes
  genres?: string[];        // Lista de gêneros (ex: ['Ação', 'Ficção Científica'])
}
```

### 2.2. Item de Canal ao Vivo (`ChannelItem`)
```typescript
export interface ChannelItem {
  id: string;
  name: string;
  logoUrl: string;          // Logo centralizada
  currentProgram?: {
    title: string;
    startTime: string;
    endTime: string;
  };
  nextProgram?: {
    title: string;
    startTime: string;
  };
  isLive: boolean;
}
```

---

## 3. Diretrizes de Normalização
- Valores numéricos de avaliação de fontes externas (ex: 8.4 no TMDB) devem ser arredondados para 1 casa decimal.
- Imagens ausentes devem receber uma URL de fallback local suave com o logotipo da raposa em marca d'água.
