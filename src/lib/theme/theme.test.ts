import { getThemeFromClient, setThemeCookie } from '@/lib/theme/theme';

describe('theme.ts - Client Functions', () => {
  let originalMatchMedia: typeof window.matchMedia;
  let originalGetItem: typeof window.localStorage.getItem;
  let originalSetItem: typeof window.localStorage.setItem;

  beforeAll(() => {
    originalMatchMedia = window.matchMedia;
    originalGetItem = window.localStorage.getItem;
    originalSetItem = window.localStorage.setItem;
  });

  afterAll(() => {
    window.matchMedia = originalMatchMedia;
    window.localStorage.getItem = originalGetItem;
    window.localStorage.setItem = originalSetItem;
  });

  beforeEach(() => {
    document.cookie = 'theme=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    window.localStorage.getItem = jest.fn();
    window.localStorage.setItem = jest.fn();
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
  });

  describe('getThemeFromClient', () => {
    it('should return light theme when window is undefined (SSR)', () => {
      const originalWindow = global.window;
      delete (global as { window?: typeof window }).window;
      const result = getThemeFromClient();
      expect(result).toBe('light');
      global.window = originalWindow;
    });

    it('should return theme from cookie when valid', () => {
      const result = getThemeFromClient('theme=dark');
      expect(result).toBe('dark');
    });

    it('should return system preference when neither cookie nor localStorage has theme', () => {
      document.cookie = 'theme=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
      window.localStorage.getItem = jest.fn().mockReturnValue(null);
      window.matchMedia = jest.fn().mockImplementation((query) => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }));
      const result = getThemeFromClient();
      expect(result).toBe('dark');
    });

    it('should return light theme when system prefers light', () => {
      document.cookie = 'theme=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
      window.localStorage.getItem = jest.fn().mockReturnValue(null);
      window.matchMedia = jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }));
      const result = getThemeFromClient();
      expect(result).toBe('light');
    });

    it('should prioritize cookie over localStorage', () => {
      document.cookie = 'theme=dark; path=/';
      const mockGetItem = jest.fn().mockReturnValue('light');
      window.localStorage.getItem = mockGetItem;
      const result = getThemeFromClient();
      expect(result).toBe('dark');
    });

    it('should return light theme when invalid theme values are provided', () => {
      document.cookie = 'theme=invalid; path=/';
      const mockGetItem = jest.fn().mockReturnValue('invalid');
      window.localStorage.getItem = mockGetItem;
      const result = getThemeFromClient();
      expect(result).toBe('light');
    });

    it('should return light theme when cookie has invalid theme value', () => {
      const result = getThemeFromClient('theme=invalid');
      expect(result).toBe('light');
    });

    it('should return light theme when localStorage has invalid theme value', () => {
      const mockGetItem = jest.fn().mockReturnValue('invalid');
      const result = getThemeFromClient('', mockGetItem);
      expect(result).toBe('light');
    });

    it('should return theme from localStorage when cookie is not available', () => {
      const mockGetItem = jest.fn().mockReturnValue('dark');
      const result = getThemeFromClient('', mockGetItem);
      expect(result).toBe('dark');
    });

    it('should handle localStorage errors gracefully', () => {
      const mockGetItem = jest.fn().mockImplementation(() => {
        throw new Error('localStorage error');
      });
      window.localStorage.getItem = mockGetItem;
      const result = getThemeFromClient();
      expect(result).toBe('light');
    });
  });

  describe('setThemeCookie', () => {
    it('should set theme cookie correctly', () => {
      document.cookie = 'theme=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
      setThemeCookie('dark');
      expect(document.cookie).toMatch(/theme=dark/);
    });

    it('should set light theme cookie correctly', () => {
      setThemeCookie('light');
      expect(document.cookie).toMatch(/theme=light/);
    });

    it('should not set cookie when document is undefined', () => {
      const originalDocument = global.document;
      delete (global as { document?: typeof document }).document;
      expect(() => setThemeCookie('dark')).not.toThrow();
      global.document = originalDocument;
    });
  });
});
