import React from 'react';
import { render } from '@testing-library/react';
import RootLayout from './layout';
import { getThemeFromServer } from '@/lib/theme/theme-server';

jest.mock('@/lib/theme/theme-server', () => ({
  getThemeFromServer: jest.fn(),
}));

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
    jest.clearAllMocks();
  });

  it('should render layout with initial theme from server', async () => {
    (getThemeFromServer as jest.Mock).mockResolvedValue('dark');
    const children = <div>Test Content</div>;
    const { getByTestId, getByText } = render(await RootLayout({ children }));

    expect(getByTestId('theme-provider')).toHaveAttribute(
      'data-initial-theme',
      'dark'
    );
    expect(getByTestId('navbar-mock')).toBeInTheDocument();
    expect(getByTestId('main-container-mock')).toBeInTheDocument();
    expect(getByText('Test Content')).toBeInTheDocument();
  });

  it('should render layout with light when getThemeFromServer returns light', async () => {
    (getThemeFromServer as jest.Mock).mockResolvedValue('light');
    const children = <div>Test Content</div>;
    const { getByTestId } = render(await RootLayout({ children }));

    expect(getByTestId('theme-provider')).toHaveAttribute(
      'data-initial-theme',
      'light'
    );
  });
});
