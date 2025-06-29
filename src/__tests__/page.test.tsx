import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Page from '@/app/page';

// Mock do Next.js Image
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

// Mock do Next.js Link
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

  it('renders without crashing', () => {
    renderWithTheme();
    expect(screen.getByText(/Get started by editing/i)).toBeInTheDocument();
  });

  it('displays the main content', () => {
    renderWithTheme();
    expect(screen.getByText(/Get started by editing/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Save and see your changes instantly/i)
    ).toBeInTheDocument();
  });

  it('shows theme toggle button', () => {
    renderWithTheme();
    expect(
      screen.getByRole('button', { name: /Switch to dark mode/i })
    ).toBeInTheDocument();
  });

  it('displays Next.js logo', () => {
    renderWithTheme();
    const logo = screen.getByAltText(/Next.js logo/i);
    expect(logo).toBeInTheDocument();
  });

  it('displays Vercel logo', () => {
    renderWithTheme();
    const logo = screen.getByAltText(/Vercel logomark/i);
    expect(logo).toBeInTheDocument();
  });

  it('has proper link structure', () => {
    renderWithTheme();
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });

  it('displays footer links', () => {
    renderWithTheme();
    expect(screen.getByText(/Learn/i)).toBeInTheDocument();
    expect(screen.getByText(/Examples/i)).toBeInTheDocument();
    expect(screen.getByText(/Go to nextjs.org/i)).toBeInTheDocument();
  });
});
