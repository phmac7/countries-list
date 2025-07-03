import { render, screen } from '@testing-library/react';
import { ButtonSkeleton } from './ButtonSkeleton';

describe('ButtonSkeleton', () => {
  it('should render the skeleton', () => {
    render(<ButtonSkeleton />);
    expect(screen.getByTestId('button-skeleton')).toBeInTheDocument();
  });
});
