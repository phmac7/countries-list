import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { CountryTemplate } from './CountryTemplate';

describe('CountryTemplate', () => {
  it('should render the country name', () => {
    const mockCountry = {
      name: {
        common: 'Brazil',
      },
    };

    render(<CountryTemplate country={mockCountry} />);

    expect(
      screen.getByRole('heading', { name: /brazil/i })
    ).toBeInTheDocument();
  });

  it('should handle missing country name gracefully', () => {
    const mockCountry = {};
    render(<CountryTemplate country={mockCountry} />);
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });
});
