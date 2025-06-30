import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@/contexts';
import Page from '@/app/(Home)/page';
import type { ImageProps } from 'next/image';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: ImageProps) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img src={src as string} alt={alt} {...props} />;
  },
}));

describe('Home Page', () => {
  const renderWithTheme = () => {
    return render(
      <ThemeProvider>
        <Page />
      </ThemeProvider>
    );
  };

  it('shows home content', () => {
    renderWithTheme();
    expect(screen.getByTestId('home-content')).toBeInTheDocument();
  });
});
