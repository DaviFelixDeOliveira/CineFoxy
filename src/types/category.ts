export type MediaTypeFilter = 'all' | 'movie' | 'series';

export interface CategoryGenreMapping {
  movieGenreId?: number;
  tvGenreId?: number;
  keywords?: string[];
  type: 'direct' | 'partial' | 'editorial';
}

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName?: string;
  backdropUrl: string;
  mapping: CategoryGenreMapping;
}

export interface CollectionCriteria {
  id: string;
  title: string;
  description: string;
  type: 'movie' | 'series';
  endpoint?: string;
  genreId?: number;
  keywords?: string[];
  voteAverageMin?: number;
  voteCountMin?: number;
  voteCountMax?: number;
  popularityMax?: number;
  dateField?: 'primary_release_date' | 'first_air_date';
  dateGte?: string;
  dateLte?: string;
  isEditorial?: boolean;
}

// Mapeamento das 17 Categorias Oficiais CineFoxy
export const CINEFOXY_CATEGORIES: CategoryItem[] = [
  {
    id: 'acao',
    name: 'Ação',
    slug: 'acao',
    description: 'Adrenalina, perseguições intensas e combates de tirar o fôlego.',
    backdropUrl: '/img/categories/acao.jpg',
    mapping: { movieGenreId: 28, tvGenreId: 10759, type: 'direct' }
  },
  {
    id: 'aventura',
    name: 'Aventura',
    slug: 'aventura',
    description: 'Grandes jornadas, expedições épicas e exploração do desconhecido.',
    backdropUrl: '/img/categories/aventura.jpg',
    mapping: { movieGenreId: 12, tvGenreId: 10759, keywords: ['quest', 'expedition'], type: 'partial' }
  },
  {
    id: 'terror',
    name: 'Terror',
    slug: 'terror',
    description: 'Medo visceral, suspense psicológico e forças sobrenaturais.',
    backdropUrl: '/img/categories/terror.jpg',
    mapping: { movieGenreId: 27, keywords: ['horror', 'haunted', 'supernatural'], type: 'editorial' }
  },
  {
    id: 'comedia',
    name: 'Comédia',
    slug: 'comedia',
    description: 'Histórias divertidas, sátiras inteligentes e bom humor.',
    backdropUrl: '/img/categories/comedia.jpg',
    mapping: { movieGenreId: 35, tvGenreId: 35, type: 'direct' }
  },
  {
    id: 'drama',
    name: 'Drama',
    slug: 'drama',
    description: 'Narrativas profundas sobre relações humanas, escolhas e emoções.',
    backdropUrl: '/img/categories/drama.jpg',
    mapping: { movieGenreId: 18, tvGenreId: 18, type: 'direct' }
  },
  {
    id: 'romance',
    name: 'Romance',
    slug: 'romance',
    description: 'Grandes encontros, paixões e histórias de amor inesquecíveis.',
    backdropUrl: '/img/categories/romance.jpg',
    mapping: { movieGenreId: 10749, keywords: ['romance', 'love story'], type: 'editorial' }
  },
  {
    id: 'suspense',
    name: 'Suspense',
    slug: 'suspense',
    description: 'Tensão psicológica contínua, segredos e reviravoltas marcantes.',
    backdropUrl: '/img/categories/suspense.jpg',
    mapping: { movieGenreId: 53, keywords: ['psychological thriller', 'suspense'], type: 'editorial' }
  },
  {
    id: 'misterio',
    name: 'Mistério',
    slug: 'misterio',
    description: 'Enigmas complexos, investigações e quebra-cabeças instigantes.',
    backdropUrl: '/img/categories/misterio.jpg',
    mapping: { movieGenreId: 9648, tvGenreId: 9648, type: 'direct' }
  },
  {
    id: 'ficcao-cientifica',
    name: 'Ficção Científica',
    slug: 'ficcao-cientifica',
    description: 'Viagens no tempo, universos paralelos e futuros tecnológicos.',
    backdropUrl: '/img/categories/ficcao-cientifica.jpg',
    mapping: { movieGenreId: 878, tvGenreId: 10765, keywords: ['space', 'future'], type: 'partial' }
  },
  {
    id: 'fantasia',
    name: 'Fantasia',
    slug: 'fantasia',
    description: 'Mundos mágicos, reinos lendários e criaturas míticas.',
    backdropUrl: '/img/categories/fantasia.jpg',
    mapping: { movieGenreId: 14, tvGenreId: 10765, keywords: ['magic', 'mythology'], type: 'partial' }
  },
  {
    id: 'animacao',
    name: 'Animação',
    slug: 'animacao',
    description: 'Obras animadas ocidentais e orientais com arte visual singular.',
    backdropUrl: '/img/categories/animacao.jpg',
    mapping: { movieGenreId: 16, tvGenreId: 16, type: 'direct' }
  },
  {
    id: 'documentario',
    name: 'Documentário',
    slug: 'documentario',
    description: 'Fatos reais, ciência, história e reflexões sobre o mundo.',
    backdropUrl: '/img/categories/documentario.jpg',
    mapping: { movieGenreId: 99, tvGenreId: 99, type: 'direct' }
  },
  {
    id: 'crime',
    name: 'Crime',
    slug: 'crime',
    description: 'Máfia, investigações forenses, tribunais e o submundo do crime.',
    backdropUrl: '/img/categories/crime.jpg',
    mapping: { movieGenreId: 80, tvGenreId: 80, type: 'direct' }
  },
  {
    id: 'familia',
    name: 'Família',
    slug: 'familia',
    description: 'Entretenimento leve e envolvente para assistir em família.',
    backdropUrl: '/img/categories/familia.jpg',
    mapping: { movieGenreId: 10751, tvGenreId: 10751, type: 'direct' }
  },
  {
    id: 'guerra',
    name: 'Guerra',
    slug: 'guerra',
    description: 'Conflitos históricos, superação e estratégias em combate.',
    backdropUrl: '/img/categories/guerra.jpg',
    mapping: { movieGenreId: 10752, tvGenreId: 10768, keywords: ['military', 'war'], type: 'partial' }
  },
  {
    id: 'historia',
    name: 'História',
    slug: 'historia',
    description: 'Eventos históricos que definiram civilizações e trajetórias humanas.',
    backdropUrl: '/img/categories/historia.jpg',
    mapping: { movieGenreId: 36, keywords: ['historical event', 'period piece'], type: 'editorial' }
  },
  {
    id: 'musica',
    name: 'Música',
    slug: 'musica',
    description: 'Histórias sonoras, musicais, biografias e celebrações da música.',
    backdropUrl: '/img/categories/musica.jpg',
    mapping: { movieGenreId: 10402, keywords: ['musical', 'musician'], type: 'editorial' }
  }
];
