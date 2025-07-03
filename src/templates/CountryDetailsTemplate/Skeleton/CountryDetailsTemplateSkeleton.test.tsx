import { render, screen } from '@testing-library/react';
import { CountryDetailsTemplateSkeleton } from './CountryDetailsTemplateSkeleton';

describe('CountryDetailsTemplateSkeleton', () => {
  it('should render the skeleton', () => {
    render(<CountryDetailsTemplateSkeleton />);
    expect(
      screen.getByTestId('country-details-template-skeleton')
    ).toBeInTheDocument();
  });
});
