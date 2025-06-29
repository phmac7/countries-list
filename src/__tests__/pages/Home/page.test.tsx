import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@/contexts';
import Page from '@/app/page';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => {
    return <img src={src} alt={alt} {...props} />;
  },
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({
    children,
    href,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe('Home Page', () => {
  const renderWithTheme = () =>
    render(
      <ThemeProvider initialTheme="light">
        <Page />
      </ThemeProvider>
    );

  it('shows home content', () => {
    renderWithTheme();
    expect(screen.getByTestId('home-content')).toBeInTheDocument();
  });
});
