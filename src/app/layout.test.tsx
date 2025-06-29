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

jest.mock('@/contexts/ThemeContext', () => ({
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

describe('RootLayout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar o layout com o tema inicial do server', async () => {
    (getThemeFromServer as jest.Mock).mockResolvedValue('dark');
    const children = <div>Conteúdo de Teste</div>;
    const { getByTestId, getByText } = render(await RootLayout({ children }));

    expect(getByTestId('theme-provider')).toHaveAttribute(
      'data-initial-theme',
      'dark'
    );
    expect(getByText('Conteúdo de Teste')).toBeInTheDocument();
  });

  it('deve renderizar o layout com tema light quando getThemeFromServer retorna light', async () => {
    (getThemeFromServer as jest.Mock).mockResolvedValue('light');
    const children = <div>Conteúdo de Teste</div>;
    const { getByTestId } = render(await RootLayout({ children }));

    expect(getByTestId('theme-provider')).toHaveAttribute(
      'data-initial-theme',
      'light'
    );
  });
});
