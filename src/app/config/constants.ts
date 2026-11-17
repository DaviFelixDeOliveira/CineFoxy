export const APP_CONFIG = {
  name: 'CineFoxy',
  description: 'Plataforma de entretenimento audiovisual com filmes, séries e canais ao vivo.',
  version: '1.0.0',
  logoPath: '/img/logo.png',
  themeStorageKey: 'cinefoxy_theme'
} as const;

export const ROUTES = {
  HOME: '/',
  MOVIES: '/filmes',
  SERIES: '/series',
  CATEGORIES: '/categorias',
  CATEGORY_DETAIL: '/categoria/:slug',
  CHANNELS: '/canais',
  FAVORITES: '/minha-lista',
  SEARCH: '/pesquisa'
} as const;

export interface NavItem {
  label: string;
  path: string;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Início', path: ROUTES.HOME },
  { label: 'Filmes', path: ROUTES.MOVIES },
  { label: 'Séries', path: ROUTES.SERIES },
  { label: 'Categorias', path: ROUTES.CATEGORIES },
  { label: 'Canais', path: ROUTES.CHANNELS },
  { label: 'Minha Lista', path: ROUTES.FAVORITES }
] as const;
