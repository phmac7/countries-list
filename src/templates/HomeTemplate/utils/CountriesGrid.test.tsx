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
  const mockIntersectionObserver = jest.fn();

  beforeEach(() => {
    window.IntersectionObserver = jest.fn().mockImplementation((callback) => ({
      observe: jest.fn(() => {
        mockIntersectionObserver.mockImplementation(() => {
          callback([{ isIntersecting: true }], {} as IntersectionObserver);
        });
      }),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
  });

  it('renders without crashing', () => {
    render(<CountriesGrid countries={[]} isFiltering={false} />);
    expect(screen.getByTestId('grid-container')).toBeInTheDocument();
  });

  it('renders countries correctly', () => {
    render(<CountriesGrid countries={mockCountries} isFiltering={false} />);
    expect(screen.getByText('Brazil')).toBeInTheDocument();
    expect(screen.getByText('100.000')).toBeInTheDocument();
    expect(screen.getByText('Brasília')).toBeInTheDocument();
    const image = screen.getByRole('img', { name: 'Brazil' });
    expect(image).toHaveAttribute('src', 'https://flagcdn.com/br.svg');
    expect(image).toHaveAttribute('alt', 'Brazil');
  });

  it('shows skeletons when filtering', () => {
    render(<CountriesGrid countries={mockCountries} isFiltering={true} />);
    expect(screen.getAllByTestId('article-card-skeleton')).toHaveLength(8);
  });

  it('applies grid content class when filtering', () => {
    render(<CountriesGrid countries={mockCountries} isFiltering={true} />);
    expect(screen.getByTestId('grid-container').parentElement).toHaveClass(
      'homeTemplate__gridContent'
    );
  });

  it('does not show skeletons when not filtering', () => {
    render(<CountriesGrid countries={mockCountries} isFiltering={false} />);
    expect(
      screen.queryByTestId('article-card-skeleton')
    ).not.toBeInTheDocument();
  });

  it('applies grid content class when not filtering', () => {
    render(<CountriesGrid countries={mockCountries} isFiltering={false} />);
    expect(screen.getByTestId('grid-container').parentElement).toHaveClass(
      'homeTemplate__gridContent'
    );
  });

  it('renders empty grid when no countries provided', () => {
    render(<CountriesGrid countries={[]} isFiltering={false} />);
    const gridContainer = screen.getByTestId('grid-container');
    expect(gridContainer.children).toHaveLength(0);
  });

  it('should render initial set of countries', () => {
    const manyCountries = Array(25).fill(mockCountries[0]);
    render(<CountriesGrid countries={manyCountries} isFiltering={false} />);
    expect(screen.getAllByRole('article')).toHaveLength(20); // Initial batch size
  });

  it('should show skeleton when filtering', () => {
    render(<CountriesGrid countries={mockCountries} isFiltering={true} />);
    expect(screen.getAllByTestId('article-card-skeleton')).toHaveLength(8);
  });

  it('should render country cards with correct information', () => {
    render(
      <CountriesGrid
        countries={mockCountries.slice(0, 1)}
        isFiltering={false}
      />
    );

    expect(screen.getByText('Brazil')).toBeInTheDocument();
    expect(screen.getByText('100.000')).toBeInTheDocument();
    expect(screen.getByText('Americas')).toBeInTheDocument();
    expect(screen.getByText('Brasília')).toBeInTheDocument();
  });

  it('should show loading indicator when more items are available', () => {
    const manyCountries = Array(25).fill(mockCountries[0]);
    render(<CountriesGrid countries={manyCountries} isFiltering={false} />);
    expect(
      screen.getByTestId('homeTemplate__loadingSpinner')
    ).toBeInTheDocument();
  });

  it('should not show loading indicator when all items are loaded', () => {
    render(
      <CountriesGrid
        countries={mockCountries.slice(0, 5)}
        isFiltering={false}
      />
    );

    expect(
      screen.queryByTestId('homeTemplate__loadingSpinner')
    ).not.toBeInTheDocument();
  });
});
