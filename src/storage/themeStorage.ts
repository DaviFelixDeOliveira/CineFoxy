import type { ThemeMode } from '@/types/theme';

const THEME_STORAGE_KEY = 'cinefoxy_theme';

// Fallback volátil em memória para a sessão atual, caso localStorage esteja bloqueado ou inacessível.
// Nota: Os dados mantidos em memória NÃO persistem após o recarregamento da página.
let inMemoryThemeFallback: ThemeMode | null = null;

export const themeStorage = {
  getTheme(): ThemeMode | null {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return inMemoryThemeFallback;
      }
      const item = window.localStorage.getItem(THEME_STORAGE_KEY);
      if (item === 'light' || item === 'dark' || item === 'system') {
        return item;
      }
      return null;
    } catch {
      // Retorna o valor volátil da sessão em caso de erro de segurança/quota
      return inMemoryThemeFallback;
    }
  },

  setTheme(theme: ThemeMode): void {
    inMemoryThemeFallback = theme;
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(THEME_STORAGE_KEY, theme);
      }
    } catch {
      // Falha silenciosa preservando a sessão em memória sem quebrar a aplicação
    }
  },

  clearTheme(): void {
    inMemoryThemeFallback = null;
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(THEME_STORAGE_KEY);
      }
    } catch {
      // Ignora falha de remoção
    }
  }
};
