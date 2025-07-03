import { render, screen } from '@testing-library/react';
import { ArticleDetailsSkeleton } from './ArticleDetailsSkeleton';

describe('ArticleDetailsSkeleton', () => {
  it('should render the skeleton', () => {
    render(<ArticleDetailsSkeleton />);
    expect(screen.getByTestId('article-details-skeleton')).toBeInTheDocument();
    expect(
      screen.getByTestId('article-details-skeleton-image')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('article-details-skeleton-content')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('article-details-skeleton-title')
    ).toBeInTheDocument();
    expect(screen.getAllByTestId('article-details-skeleton-text')).toHaveLength(
      4
    );
    expect(
      screen.getByTestId('article-details-skeleton-text-label')
    ).toBeInTheDocument();
    expect(screen.getAllByTestId('article-details-skeleton-chip')).toHaveLength(
      3
    );
  });
});
