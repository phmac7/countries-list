import {
  fireEvent,
  render,
  screen,
  waitFor,
  act,
} from '@testing-library/react';
import { HomeTemplate } from './HomeTemplate';
import { CountrySummary, Region } from '@/types/data';

const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockImplementation(() => {
  return {
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  };
});
window.IntersectionObserver = mockIntersectionObserver;

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
  {
    name: {
      common: 'Argentina',
      official: 'Argentina',
      nativeName: {
        spa: {
          common: 'Argentina',
          official: 'Argentina',
        },
      },
    },
    flags: {
      png: 'https://flagcdn.com/ar.svg',
      svg: 'https://flagcdn.com/ar.svg',
      alt: 'Argentina',
    },
    region: Region.Americas,
    population: 103,
    capital: ['Buenos Aires'],
    cca3: 'ARG',
  },
];

describe('HomeTemplate', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<HomeTemplate countries={[]} />);
    expect(
      screen.getByPlaceholderText('Search for a country...')
    ).toBeInTheDocument();
  });

  it('renders the countries correctly', () => {
    render(<HomeTemplate countries={mockCountries} />);
    expect(screen.getByText('Brazil')).toBeInTheDocument();
    expect(screen.getByText('100.000')).toBeInTheDocument();
    expect(screen.getByText('Brasília')).toBeInTheDocument();
    const image = screen.getByRole('img', { name: 'Brazil' });
    expect(image).toHaveAttribute('src', 'https://flagcdn.com/br.svg');
    expect(image).toHaveAttribute('alt', 'Brazil');
  });

  it('renders the select bar correctly', () => {
    render(<HomeTemplate countries={mockCountries} />);
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(
      screen.getByRole('option', { name: /filter by region/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('option', { name: 'Americas' })
    ).toBeInTheDocument();
  });

  it('should show loading state while filtering', async () => {
    render(<HomeTemplate countries={mockCountries} />);
    const input = screen.getByPlaceholderText('Search for a country...');

    expect(screen.getByText('Brazil')).toBeInTheDocument();
    expect(screen.getByText('Argentina')).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'Brazil' } });

    expect(screen.getAllByTestId('article-card-skeleton')).toHaveLength(8);

    act(() => {
      jest.advanceTimersByTime(300);
    });

    await waitFor(() => {
      expect(
        screen.queryByTestId('article-card-skeleton')
      ).not.toBeInTheDocument();
    });
  });

  it('should filter by region', async () => {
    render(<HomeTemplate countries={mockCountries} />);
    const select = screen.getByRole('combobox');

    expect(screen.getByText('Brazil')).toBeInTheDocument();
    expect(screen.getByText('Argentina')).toBeInTheDocument();

    fireEvent.change(select, { target: { value: 'Americas' } });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    await waitFor(() => {
      expect(screen.getByText('Brazil')).toBeInTheDocument();
      expect(screen.getByText('Argentina')).toBeInTheDocument();
      expect(
        screen.queryByTestId('article-card-skeleton')
      ).not.toBeInTheDocument();
    });
  });

  it('should filter correctly if name is a string', async () => {
    const mockCountriesWithStringName = [
      {
        name: 'Brazil',
        flags: 'https://flagcdn.com/br.svg',
        region: Region.Americas,
        population: 100000,
        capital: ['Brasília'],
        cca3: 'BRA',
      },
    ] as unknown as CountrySummary[];

    render(<HomeTemplate countries={mockCountriesWithStringName} />);
    const input = screen.getByPlaceholderText('Search for a country...');

    expect(screen.getByText('Brazil')).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'Brazil' } });
    act(() => {
      jest.advanceTimersByTime(300);
    });

    await waitFor(() => {
      expect(screen.getByText('Brazil')).toBeInTheDocument();
    });
  });
});
