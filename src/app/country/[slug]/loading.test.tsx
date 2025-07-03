import { render, screen } from '@testing-library/react';
import Loading from './loading';

describe('Loading', () => {
  it('should render the skeleton', () => {
    render(<Loading />);
    expect(
      screen.getByTestId('country-details-template-skeleton')
    ).toBeInTheDocument();
  });
});
