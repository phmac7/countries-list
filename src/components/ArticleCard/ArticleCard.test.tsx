import { render, screen } from '@testing-library/react';
import { ArticleCard } from './ArticleCard';

describe('ArticleCard', () => {
  it('should render the article card', () => {
    render(
      <ArticleCard
        imageSrc="https://flagcdn.com/br.svg"
        imageAlt="Brazil"
        title="BrazilTitle"
        population={213993437}
        region="Americas"
        capital="Brasília"
        cca3="BRA"
      />
    );
    expect(screen.getByText('BrazilTitle')).toBeInTheDocument();
    expect(screen.getByText('213.993.437')).toBeInTheDocument();
    expect(screen.getByText('Americas')).toBeInTheDocument();
    expect(screen.getByText('Brasília')).toBeInTheDocument();
    expect(screen.getByText('BrazilTitle')).toBeInTheDocument();
  });
  it('should render the article card with the correct link', () => {
    render(
      <ArticleCard
        imageSrc="https://flagcdn.com/br.svg"
        imageAlt="Brazil"
        title="BrazilTitle"
        population={213993437}
        region="Americas"
        capital="Brasília"
        cca3="BRA"
      />
    );
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/country/BRA');
  });
});
