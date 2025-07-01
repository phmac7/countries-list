import { render, screen } from '@testing-library/react';
import { CountriesGrid } from './CountriesGrid';
import { CountrySummary, Region } from '@/types/data';

const mockCountries: CountrySummary[] = [
  {
    name: {
      common: 'Brazil',
      official: 'Brazil',
      nativeName: {
        por: {
          common: 'Brasil',
          official: 'Brasil',
        },
      },
    },
    flags: {
      png: 'https://flagcdn.com/br.svg',
      svg: 'https://flagcdn.com/br.svg',
      alt: 'Brazil',
    },
    region: Region.Americas,
    population: 100000,
    capital: ['Brasília'],
    cca3: 'BRA',
  },
];

describe('CountriesGrid', () => {
  it('renders without crashing', () => {
    render(<CountriesGrid countries={[]} isFiltering={false} />);
    expect(screen.getByTestId('grid-container')).toBeInTheDocument();
  });

  it('renders countries correctly', () => {
    render(<CountriesGrid countries={mockCountries} isFiltering={false} />);
    expect(screen.getByText('Brazil')).toBeInTheDocument();
    expect(screen.getByText('100000')).toBeInTheDocument();
    expect(screen.getByText('Brasília')).toBeInTheDocument();
    const image = screen.getByRole('img', { name: 'Brazil' });
    expect(image).toHaveAttribute('src', 'https://flagcdn.com/br.svg');
    expect(image).toHaveAttribute('alt', 'Brazil');
  });

  it('shows loading spinner when filtering', () => {
    render(<CountriesGrid countries={mockCountries} isFiltering={true} />);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('applies blur class when filtering', () => {
    render(<CountriesGrid countries={mockCountries} isFiltering={true} />);
    expect(screen.getByTestId('grid-container').parentElement).toHaveClass(
      'homeTemplate__gridBlur'
    );
  });

  it('does not show loading spinner when not filtering', () => {
    render(<CountriesGrid countries={mockCountries} isFiltering={false} />);
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  it('does not apply blur class when not filtering', () => {
    render(<CountriesGrid countries={mockCountries} isFiltering={false} />);
    expect(screen.getByTestId('grid-container').parentElement).not.toHaveClass(
      'homeTemplate__gridBlur'
    );
  });

  it('renders empty grid when no countries provided', () => {
    render(<CountriesGrid countries={[]} isFiltering={false} />);
    const gridContainer = screen.getByTestId('grid-container');
    expect(gridContainer).toBeEmptyDOMElement();
  });
});
