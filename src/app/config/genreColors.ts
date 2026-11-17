/**
 * CineFoxy — Genre Color System
 * 
 * Sistema centralizado e tipado de cores para as 17 categorias de gênero.
 * Mantém o Laranja Fox (#FF5722) preservado como cor institucional da marca.
 */

export interface GenreColorDefinition {
  name: string;
  slug: string;
  hex: string;
  rgb: string; // "R, G, B" para uso flexível com rgba(...)
  textContrast: string; // Cor recomendada para texto sobreposto
  borderTint: string;
}

export const GENRE_COLORS: Record<string, GenreColorDefinition> = {
  acao: {
    name: 'Ação',
    slug: 'acao',
    hex: '#EF5350',
    rgb: '239, 83, 80',
    textContrast: '#FFFFFF',
    borderTint: 'rgba(239, 83, 80, 0.4)'
  },
  aventura: {
    name: 'Aventura',
    slug: 'aventura',
    hex: '#E58A39',
    rgb: '229, 138, 57',
    textContrast: '#FFFFFF',
    borderTint: 'rgba(229, 138, 57, 0.4)'
  },
  comedia: {
    name: 'Comédia',
    slug: 'comedia',
    hex: '#E6B83F',
    rgb: '230, 184, 63',
    textContrast: '#121212',
    borderTint: 'rgba(230, 184, 63, 0.4)'
  },
  romance: {
    name: 'Romance',
    slug: 'romance',
    hex: '#E879A9',
    rgb: '232, 121, 169',
    textContrast: '#FFFFFF',
    borderTint: 'rgba(232, 121, 169, 0.4)'
  },
  terror: {
    name: 'Terror',
    slug: 'terror',
    hex: '#A16AC7',
    rgb: '161, 106, 199',
    textContrast: '#FFFFFF',
    borderTint: 'rgba(161, 106, 199, 0.4)'
  },
  suspense: {
    name: 'Suspense',
    slug: 'suspense',
    hex: '#718096',
    rgb: '113, 128, 150',
    textContrast: '#FFFFFF',
    borderTint: 'rgba(113, 128, 150, 0.4)'
  },
  'ficcao-cientifica': {
    name: 'Ficção científica',
    slug: 'ficcao-cientifica',
    hex: '#36B7C8',
    rgb: '54, 183, 200',
    textContrast: '#121212',
    borderTint: 'rgba(54, 183, 200, 0.4)'
  },
  fantasia: {
    name: 'Fantasia',
    slug: 'fantasia',
    hex: '#9272D0',
    rgb: '146, 114, 208',
    textContrast: '#FFFFFF',
    borderTint: 'rgba(146, 114, 208, 0.4)'
  },
  drama: {
    name: 'Drama',
    slug: 'drama',
    hex: '#6684C6',
    rgb: '102, 132, 198',
    textContrast: '#FFFFFF',
    borderTint: 'rgba(102, 132, 198, 0.4)'
  },
  animacao: {
    name: 'Animação',
    slug: 'animacao',
    hex: '#4CA77C',
    rgb: '76, 167, 124',
    textContrast: '#FFFFFF',
    borderTint: 'rgba(76, 167, 124, 0.4)'
  },
  documentario: {
    name: 'Documentário',
    slug: 'documentario',
    hex: '#65A6A0',
    rgb: '101, 166, 160',
    textContrast: '#FFFFFF',
    borderTint: 'rgba(101, 166, 160, 0.4)'
  },
  musical: {
    name: 'Musical',
    slug: 'musical',
    hex: '#D47BA8',
    rgb: '212, 123, 168',
    textContrast: '#FFFFFF',
    borderTint: 'rgba(212, 123, 168, 0.4)'
  },
  misterio: {
    name: 'Mistério',
    slug: 'misterio',
    hex: '#5C6BC0',
    rgb: '92, 107, 192',
    textContrast: '#FFFFFF',
    borderTint: 'rgba(92, 107, 192, 0.4)'
  },
  crime: {
    name: 'Crime',
    slug: 'crime',
    hex: '#9E2A2B',
    rgb: '158, 42, 43',
    textContrast: '#FFFFFF',
    borderTint: 'rgba(158, 42, 43, 0.4)'
  },
  familia: {
    name: 'Família',
    slug: 'familia',
    hex: '#F4A261',
    rgb: '244, 162, 97',
    textContrast: '#121212',
    borderTint: 'rgba(244, 162, 97, 0.4)'
  },
  guerra: {
    name: 'Guerra',
    slug: 'guerra',
    hex: '#6B705C',
    rgb: '107, 112, 92',
    textContrast: '#FFFFFF',
    borderTint: 'rgba(107, 112, 92, 0.4)'
  },
  historia: {
    name: 'História',
    slug: 'historia',
    hex: '#A98467',
    rgb: '169, 132, 103',
    textContrast: '#FFFFFF',
    borderTint: 'rgba(169, 132, 103, 0.4)'
  }
};

// Fallback padrão neutro com toque institucional CineFoxy
const DEFAULT_GENRE_COLOR: GenreColorDefinition = {
  name: 'Geral',
  slug: 'geral',
  hex: '#FF5722',
  rgb: '255, 87, 34',
  textContrast: '#FFFFFF',
  borderTint: 'rgba(255, 87, 34, 0.4)'
};

const GENRE_KEY_ALIASES: Record<string, string> = {
  musica: 'musical'
};

/**
 * Normaliza uma string de gênero ou slug para chave de busca
 */
function normalizeKey(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

/**
 * Retorna a definição completa de cor de um gênero por nome ou slug
 */
export function getGenreColor(nameOrSlug?: string): GenreColorDefinition {
  if (!nameOrSlug) return DEFAULT_GENRE_COLOR;

  const rawKey = normalizeKey(nameOrSlug);
  const resolvedKey = GENRE_KEY_ALIASES[rawKey] || rawKey;

  if (GENRE_COLORS[resolvedKey]) return GENRE_COLORS[resolvedKey];

  // Busca por correspondência no nome
  const found = Object.values(GENRE_COLORS).find(
    (g) => normalizeKey(g.name) === resolvedKey || g.slug === resolvedKey
  );

  return found || DEFAULT_GENRE_COLOR;
}

/**
 * Gera um gradiente cinematográfico para o card da categoria
 */
export function getGenreGradient(nameOrSlug?: string, opacityTop = 0.35): string {
  const color = getGenreColor(nameOrSlug);
  return `linear-gradient(135deg, rgba(${color.rgb}, ${opacityTop}) 0%, rgba(20, 20, 20, 0.85) 55%, rgba(9, 9, 9, 0.96) 100%)`;
}
