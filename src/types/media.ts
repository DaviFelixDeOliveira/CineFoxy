export type MediaType = 'movie' | 'series' | 'channel';

export interface MediaItem {
  id: string;
  title: string;
  overview: string;
  posterUrl: string;
  backdropUrl?: string;
  type: MediaType;
  releaseYear?: number;
  rating?: number; // 0.0 a 10.0
  durationMinutes?: number;
  genres?: string[];
}

export interface ChannelItem {
  id: string;
  name: string;
  logoUrl: string;
  category?: string;
  isLive: boolean;
  currentProgram?: {
    title: string;
    startTime: string;
    endTime: string;
  };
  nextProgram?: {
    title: string;
    startTime: string;
  };
}
