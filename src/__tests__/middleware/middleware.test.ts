import { NextResponse } from 'next/server';
import { middleware } from '../../middleware';

jest.mock('next/server', () => ({
  NextResponse: {
    next: jest.fn(),
  },
}));

const mockNextResponse = NextResponse as jest.Mocked<typeof NextResponse>;

describe('middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockNextResponse.next.mockReturnValue({
      cookies: {
        set: jest.fn(),
      },
    } as never);
  });

  it('should set theme cookie when no theme cookie exists', () => {
    const mockRequest = {
      nextUrl: { pathname: '/' },
      cookies: {
        get: jest.fn().mockReturnValue(undefined),
      },
      headers: {
        get: jest.fn().mockImplementation((header: string) => {
          if (header === 'user-agent')
            return 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';
          if (header === 'accept-language') return 'en-US,en;q=0.9';
          if (header === 'sec-ch-prefers-color-scheme') return undefined;
          return undefined;
        }),
      },
    } as never;

    const mockResponse = {
      cookies: {
        set: jest.fn(),
      },
    };
    mockNextResponse.next.mockReturnValue(mockResponse as never);

    const result = middleware(mockRequest);

    expect(mockResponse.cookies.set).toHaveBeenCalledWith('theme', 'light', {
      httpOnly: false,
      secure: false,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365,
    });
    expect(result).toBe(mockResponse);
  });

  it('should not set theme cookie when theme cookie already exists', () => {
    const mockRequest = {
      nextUrl: { pathname: '/' },
      cookies: {
        get: jest.fn().mockReturnValue({ value: 'dark' }),
      },
      headers: {
        get: jest.fn(),
      },
    } as never;

    const mockResponse = {
      cookies: {
        set: jest.fn(),
      },
    };
    mockNextResponse.next.mockReturnValue(mockResponse as never);

    const result = middleware(mockRequest);

    expect(mockResponse.cookies.set).not.toHaveBeenCalled();
    expect(result).toBe(mockResponse);
  });

  it('should detect dark theme preference from user agent', () => {
    const mockRequest = {
      nextUrl: { pathname: '/' },
      cookies: {
        get: jest.fn().mockReturnValue(undefined),
      },
      headers: {
        get: jest.fn().mockImplementation((header: string) => {
          if (header === 'user-agent')
            return 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Dark';
          if (header === 'accept-language') return 'en-US,en;q=0.9';
          if (header === 'sec-ch-prefers-color-scheme') return undefined;
          return undefined;
        }),
      },
    } as never;

    const mockResponse = {
      cookies: {
        set: jest.fn(),
      },
    };
    mockNextResponse.next.mockReturnValue(mockResponse as never);

    middleware(mockRequest);

    expect(mockResponse.cookies.set).toHaveBeenCalledWith(
      'theme',
      'dark',
      expect.any(Object)
    );
  });

  it('should detect dark theme preference from accept-language', () => {
    const mockRequest = {
      nextUrl: { pathname: '/' },
      cookies: {
        get: jest.fn().mockReturnValue(undefined),
      },
      headers: {
        get: jest.fn().mockImplementation((header: string) => {
          if (header === 'user-agent')
            return 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';
          if (header === 'accept-language') return 'en-US,en;q=0.9,dark';
          if (header === 'sec-ch-prefers-color-scheme') return undefined;
          return undefined;
        }),
      },
    } as never;

    const mockResponse = {
      cookies: {
        set: jest.fn(),
      },
    };
    mockNextResponse.next.mockReturnValue(mockResponse as never);

    middleware(mockRequest);

    expect(mockResponse.cookies.set).toHaveBeenCalledWith(
      'theme',
      'dark',
      expect.any(Object)
    );
  });

  it('should detect dark theme preference from sec-ch-prefers-color-scheme', () => {
    const mockRequest = {
      nextUrl: { pathname: '/' },
      cookies: {
        get: jest.fn().mockReturnValue(undefined),
      },
      headers: {
        get: jest.fn().mockImplementation((header: string) => {
          if (header === 'user-agent')
            return 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';
          if (header === 'accept-language') return 'en-US,en;q=0.9';
          if (header === 'sec-ch-prefers-color-scheme') return 'dark';
          return undefined;
        }),
      },
    } as never;

    const mockResponse = {
      cookies: {
        set: jest.fn(),
      },
    };
    mockNextResponse.next.mockReturnValue(mockResponse as never);

    middleware(mockRequest);

    expect(mockResponse.cookies.set).toHaveBeenCalledWith(
      'theme',
      'dark',
      expect.any(Object)
    );
  });

  it('should set secure cookie in production environment', () => {
    const originalEnv = process.env.NODE_ENV;
    // @ts-expect-error - NODE_ENV is readonly but works in tests
    process.env.NODE_ENV = 'production';

    const mockRequest = {
      nextUrl: { pathname: '/' },
      cookies: {
        get: jest.fn().mockReturnValue(undefined),
      },
      headers: {
        get: jest.fn().mockImplementation((header: string) => {
          if (header === 'user-agent')
            return 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';
          if (header === 'accept-language') return 'en-US,en;q=0.9';
          if (header === 'sec-ch-prefers-color-scheme') return undefined;
          return undefined;
        }),
      },
    } as never;

    const mockResponse = {
      cookies: {
        set: jest.fn(),
      },
    };
    mockNextResponse.next.mockReturnValue(mockResponse as never);

    middleware(mockRequest);

    expect(mockResponse.cookies.set).toHaveBeenCalledWith('theme', 'light', {
      httpOnly: false,
      secure: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365,
    });

    // Restaurar NODE_ENV
    // @ts-expect-error - NODE_ENV is readonly but works in tests
    process.env.NODE_ENV = originalEnv;
  });

  it('should handle missing headers gracefully', () => {
    const mockRequest = {
      nextUrl: { pathname: '/' },
      cookies: {
        get: jest.fn().mockReturnValue(undefined),
      },
      headers: {
        get: jest.fn().mockReturnValue(undefined),
      },
    } as never;

    const mockResponse = {
      cookies: {
        set: jest.fn(),
      },
    };
    mockNextResponse.next.mockReturnValue(mockResponse as never);

    expect(() => middleware(mockRequest)).not.toThrow();

    expect(mockResponse.cookies.set).toHaveBeenCalledWith(
      'theme',
      'light',
      expect.any(Object)
    );
  });
});