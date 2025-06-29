export type Theme = 'light' | 'dark';

export const getThemeFromClient = (
  cookieString?: string,
  localStorageGetItem?: (key: string) => string | null,
  matchMediaFn?: (query: string) => { matches: boolean }
): Theme => {
  if (typeof window === 'undefined') return 'light';

  try {
    const cookies = (cookieString ?? document.cookie).split(';');
    const themeCookie = cookies.find((cookie) =>
      cookie.trim().startsWith('theme=')
    );
    if (themeCookie) {
      const theme = themeCookie.split('=')[1] as Theme;
      if (theme === 'light' || theme === 'dark') {
        return theme;
      }
    }

    const getItem =
      localStorageGetItem ??
      window.localStorage.getItem.bind(window.localStorage);
    const saved = getItem('theme') as Theme;
    if (saved && (saved === 'light' || saved === 'dark')) {
      return saved;
    }

    const matchMedia = matchMediaFn ?? window.matchMedia.bind(window);
    const prefersDark = matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  } catch {
    return 'light';
  }
};

export const setThemeCookie = (theme: Theme) => {
  if (typeof document === 'undefined') return;

  document.cookie = `theme=${theme}; path=/; max-age=${
    60 * 60 * 24 * 365
  }; samesite=lax`;
};
