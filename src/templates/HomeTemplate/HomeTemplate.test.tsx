import { fireEvent, render, screen } from '@testing-library/react';
import { HomeTemplate } from './HomeTemplate';
import { Region } from '@/types/data';

const mockCountries = [
  {
    name: {
      common: 'Brazil',
      official: 'Brazil',
      nativeName: { pt: { common: 'Brasil', official: 'Brasil' } },
    },
    flags: {
      png: 'https://flagcdn.com/br.svg',
      svg: 'https://flagcdn.com/br.svg',
      alt: 'Brazil',
    },
    region: 'Americas' as Region,
    population: 100000,
    capital: ['Brasília'],
    cca3: 'BRA',
  },
  {
    name: {
      common: 'Argentina',
      official: 'Argentina',
      nativeName: { es: { common: 'Argentina', official: 'Argentina' } },
    },
    flags: {
      png: 'https://flagcdn.com/ar.svg',
      svg: 'https://flagcdn.com/ar.svg',
      alt: 'Argentina',
    },
    region: 'Americas' as Region,
    population: 103,
    capital: ['Buenos Aires'],
    cca3: 'ARG',
  },
] as never;
describe('HomeTemplate', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  beforeEach(() => {
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
    expect(screen.getByText('100000')).toBeInTheDocument();
    expect(screen.getByText('Brasília')).toBeInTheDocument();
    const image = screen.getByRole('img', { name: 'Brazil' });
    expect(image).toHaveAttribute('src', 'https://flagcdn.com/br.svg');
    expect(image).toHaveAttribute('alt', 'Brazil');
  });
  it('render the select bar correctly', () => {
    render(<HomeTemplate countries={[]} />);
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();

    const option = screen.getByRole('option', { name: /filter by region/i });
    expect(option).toBeInTheDocument();
  });
  it('should filter the countries correctly', () => {
    render(<HomeTemplate countries={mockCountries} />);
    const input = screen.getByPlaceholderText('Search for a country...');
    fireEvent.change(input, { target: { value: 'Brazil' } });
    expect(screen.getByText('Brazil')).toBeInTheDocument();
    expect(screen.queryByText('Argentina')).not.toBeInTheDocument();
    fireEvent.change(input, { target: { value: 'Argentina' } });
    expect(screen.getByText('Argentina')).toBeInTheDocument();
    expect(screen.queryByText('Brazil')).not.toBeInTheDocument();
  });

  it('should filter correctly if name is a string', () => {
    const mockCountriesWithStringName = [
      {
        name: 'Brazil',
        flags: 'https://flagcdn.com/br.svg',
        region: 'Americas' as Region,
      },
    ] as never;
    render(<HomeTemplate countries={mockCountriesWithStringName} />);
    const input = screen.getByPlaceholderText('Search for a country...');
    fireEvent.change(input, { target: { value: 'Brazil' } });
    expect(screen.getByText('Brazil')).toBeInTheDocument();
    expect(screen.queryByText('Argentina')).not.toBeInTheDocument();
  });
});
