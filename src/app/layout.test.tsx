import RootLayout from './layout';
import { getThemeFromServer } from '@/lib/theme/theme-server';

jest.mock('@/lib/theme/theme-server');

jest.mock('next/font/google', () => ({
  Nunito_Sans: () => ({ className: 'nunito-sans' }),
}));

jest.mock('@/contexts', () => ({
  ThemeProvider: ({
    children,
    initialTheme,
  }: {
    children: React.ReactNode;
    initialTheme: string;
  }) => (
    <div data-testid="theme-provider" data-initial-theme={initialTheme}>
      {children}
    </div>
  ),
}));

jest.mock('@/components', () => ({
  Navbar: () => <div data-testid="navbar-mock">Navbar Mock</div>,
  MainContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="main-container-mock">{children}</div>
  ),
}));

describe('RootLayout', () => {
  beforeEach(() => {
    (getThemeFromServer as jest.Mock).mockResolvedValue('light');
  });

  it('renders with initial theme from server', async () => {
    const children = <div data-testid="test-child">Test Content</div>;
    const layout = await RootLayout({ children });

    // Check if the html element has the correct theme
    expect(layout.props['data-theme']).toBe('light');
  });
});
