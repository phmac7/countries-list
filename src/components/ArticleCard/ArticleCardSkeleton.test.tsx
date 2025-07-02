import { render, screen } from '@testing-library/react';
import { ArticleCardSkeleton } from './ArticleCardSkeleton';
import styles from './ArticleCardSkeleton.module.scss';

describe('ArticleCardSkeleton', () => {
  it('should render with correct test id', () => {
    render(<ArticleCardSkeleton />);
    expect(screen.getByTestId('article-card-skeleton')).toBeInTheDocument();
  });

  it('should render all skeleton elements', () => {
    render(<ArticleCardSkeleton />);

    expect(screen.getByTestId('skeleton-image')).toBeInTheDocument();
    expect(screen.getByTestId('skeleton-content')).toBeInTheDocument();
    expect(screen.getByTestId('skeleton-title')).toBeInTheDocument();

    const textPlaceholders = screen.getAllByTestId('skeleton-text');
    expect(textPlaceholders).toHaveLength(3);
  });

  it('should have proper structure', () => {
    const { container } = render(<ArticleCardSkeleton />);
    expect(container.querySelector('.skeleton')).toMatchSnapshot();
  });

  it('should have correct image dimensions', () => {
    render(<ArticleCardSkeleton />);
    const image = screen.getByTestId('skeleton-image');
    expect(image).toHaveClass(styles.skeleton__image);
  });
});
