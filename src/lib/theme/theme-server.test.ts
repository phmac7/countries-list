import { getThemeFromServer } from '@/lib/theme/theme-server';

// Mock do next/headers
jest.mock('next/headers', () => ({
  cookies: jest.fn(),
}));

const mockCookies = jest.mocked(require('next/headers').cookies);

describe('theme-server.ts - Server Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getThemeFromServer', () => {
    it('should return theme from cookie when available', async () => {
      const mockCookieStore = {
        get: jest.fn().mockReturnValue({ value: 'dark' }),
      };
      mockCookies.mockResolvedValue(mockCookieStore as never);

      const result = await getThemeFromServer();

      expect(mockCookies).toHaveBeenCalled();
      expect(mockCookieStore.get).toHaveBeenCalledWith('theme');
      expect(result).toBe('dark');
    });

    it('should return light theme when cookie is not available', async () => {
      const mockCookieStore = {
        get: jest.fn().mockReturnValue(undefined),
      };
      mockCookies.mockResolvedValue(mockCookieStore as never);

      const result = await getThemeFromServer();

      expect(mockCookieStore.get).toHaveBeenCalledWith('theme');
      expect(result).toBe('light');
    });

    it('should return light theme when cookie value is null', async () => {
      const mockCookieStore = {
        get: jest.fn().mockReturnValue({ value: null }),
      };
      mockCookies.mockResolvedValue(mockCookieStore as never);

      const result = await getThemeFromServer();

      expect(result).toBe('light');
    });

    it('should return light theme when cookie value is empty string', async () => {
      const mockCookieStore = {
        get: jest.fn().mockReturnValue({ value: '' }),
      };
      mockCookies.mockResolvedValue(mockCookieStore as never);

      const result = await getThemeFromServer();

      expect(result).toBe('light');
    });

    it('should return light theme when cookies() throws an error', async () => {
      mockCookies.mockRejectedValue(new Error('Cookies error'));

      const result = await getThemeFromServer();

      expect(result).toBe('light');
    });

    it('should return light theme when cookieStore.get() throws an error', async () => {
      const mockCookieStore = {
        get: jest.fn().mockImplementation(() => {
          throw new Error('Cookie store error');
        }),
      };
      mockCookies.mockResolvedValue(mockCookieStore as never);

      const result = await getThemeFromServer();

      expect(result).toBe('light');
    });

    it('should return light theme for invalid theme values', async () => {
      const mockCookieStore = {
        get: jest.fn().mockReturnValue({ value: 'invalid-theme' }),
      };
      mockCookies.mockResolvedValue(mockCookieStore as never);

      const result = await getThemeFromServer();

      expect(result).toBe('light');
    });

    it('should return dark theme when cookie value is dark', async () => {
      const mockCookieStore = {
        get: jest.fn().mockReturnValue({ value: 'dark' }),
      };
      mockCookies.mockResolvedValue(mockCookieStore as never);

      const result = await getThemeFromServer();

      expect(result).toBe('dark');
    });

    it('should return light theme when cookie value is light', async () => {
      const mockCookieStore = {
        get: jest.fn().mockReturnValue({ value: 'light' }),
      };
      mockCookies.mockResolvedValue(mockCookieStore as never);

      const result = await getThemeFromServer();

      expect(result).toBe('light');
    });
  });
});
