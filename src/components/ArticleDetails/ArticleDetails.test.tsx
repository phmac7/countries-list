import { render, screen } from '@testing-library/react';
import { ArticleDetails } from './ArticleDetails';

describe('ArticleDetails', () => {
  it('renders basic details correctly', () => {
    render(
      <ArticleDetails
        title="Brazil"
        description={[
          { label: 'Population', value: '214 million' },
          { label: 'Region', value: 'Americas' },
        ]}
      />
    );

    expect(screen.getByText('Brazil')).toBeInTheDocument();
    expect(screen.getByText('Population:')).toBeInTheDocument();
    expect(screen.getByText('214 million')).toBeInTheDocument();
    expect(screen.getByText('Region:')).toBeInTheDocument();
    expect(screen.getByText('Americas')).toBeInTheDocument();
  });

  it('renders image when provided', () => {
    render(
      <ArticleDetails
        title="Brazil"
        description={[]}
        image="/flag.png"
        imageAlt="Brazil flag"
      />
    );

    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('alt', 'Brazil flag');
  });

  it('renders border countries as chips', () => {
    render(
      <ArticleDetails
        title="Brazil"
        description={[]}
        chips={{
          label: 'Border Countries',
          values: [
            { label: 'Argentina', href: 'ARG' },
            { label: 'Uruguay', href: 'URY' },
          ],
        }}
      />
    );

    expect(screen.getByText('Border Countries:')).toBeInTheDocument();
    expect(screen.getByText('Argentina')).toBeInTheDocument();
    expect(screen.getByText('Uruguay')).toBeInTheDocument();

    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', '/country/ARG');
    expect(links[1]).toHaveAttribute('href', '/country/URY');
  });

  it('handles array values in description', () => {
    render(
      <ArticleDetails
        title="Brazil"
        description={[{ label: 'Languages', value: ['Portuguese', 'Spanish'] }]}
      />
    );

    expect(screen.getByText('Languages:')).toBeInTheDocument();
    expect(screen.getByText('Portuguese, Spanish')).toBeInTheDocument();
  });

  it('handles undefined values in description', () => {
    render(
      <ArticleDetails
        title="Brazil"
        description={[{ label: 'Capital', value: undefined }]}
      />
    );

    expect(screen.getByText('Capital:')).toBeInTheDocument();
    expect(screen.getByText('Capital:').nextSibling?.textContent).toBe(' ');
  });

  it('does not render chips section when no chips provided', () => {
    render(<ArticleDetails title="Brazil" description={[]} />);

    expect(screen.queryByTestId('chips-section')).not.toBeInTheDocument();
  });

  it('renders chips when provided', () => {
    render(
      <ArticleDetails
        title="Brazil"
        description={[]}
        chips={{
          label: 'Border Countries',
          values: [
            { label: 'Argentina', href: 'argentina' },
            { label: 'Uruguay', href: 'uruguay' },
          ],
        }}
      />
    );

    expect(screen.getByText('Border Countries:')).toBeInTheDocument();
    expect(screen.getByText('Argentina')).toBeInTheDocument();
    expect(screen.getByText('Uruguay')).toBeInTheDocument();
  });
});
