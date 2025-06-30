import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const themeCookie = request.cookies.get('theme');

  if (themeCookie) {
    return NextResponse.next();
  }

  const userAgent = request.headers.get('user-agent') ?? '';
  const acceptLanguage = request.headers.get('accept-language') ?? '';
  const prefersColorScheme = request.headers.get('sec-ch-prefers-color-scheme');

  let theme = 'light';

  if (
    userAgent.toLowerCase().includes('dark') ||
    acceptLanguage.toLowerCase().includes('dark') ||
    prefersColorScheme === 'dark'
  ) {
    theme = 'dark';
  }

  const response = NextResponse.next();
  response.cookies.set('theme', theme, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
