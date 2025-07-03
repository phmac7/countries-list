import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { CountryDetailsTemplate } from './CountryDetailsTemplate';
import {
  ICountryDetails,
  Region,
  Side,
  StartOfWeek,
  Status,
  Continent,
} from '@/types/data';

describe('CountryDetailsTemplate', () => {
  const mockCountryDetails: ICountryDetails = {
    name: {
      common: 'Brazil',
      official: 'Federative Republic of Brazil',
      nativeName: {
        por: {
          common: 'Brasil',
          official: 'República Federativa do Brasil',
        },
      },
    },
    population: 214000000,
    region: Region.Americas,
    subregion: 'South America',
    capital: ['Brasília'],
    tld: ['.br'],
    currencies: {
      BRL: {
        name: 'Brazilian Real',
        symbol: 'R$',
      },
    },
    languages: {
      por: 'Portuguese',
    },
    flags: {
      png: '/flag.png',
      svg: '/flag.svg',
      alt: 'Flag of Brazil',
    },
    borders: ['ARG', 'URY'],
    bordersNormalized: ['Argentina', 'Uruguay'],
    cca2: 'BR',
    independent: true,
    status: Status.OfficiallyAssigned,
    unMember: true,
    idd: { root: '+5', suffixes: ['5'] },
    altSpellings: ['BR', 'Brasil'],
    latlng: [-10, -55],
    landlocked: false,
    area: 8515770,
    demonyms: {
      eng: { f: 'Brazilian', m: 'Brazilian' },
      fra: { f: 'Brésilienne', m: 'Brésilien' },
    },
    cca3: 'BRA',
    translations: {},
    flag: '🇧🇷',
    maps: {
      googleMaps: 'https://goo.gl/maps/waCKk21HeeqFzkNC9',
      openStreetMaps: 'https://www.openstreetmap.org/relation/59470',
    },
    car: { signs: ['BR'], side: Side.Right },
    timezones: ['UTC-05:00', 'UTC-04:00', 'UTC-03:00', 'UTC-02:00'],
    continents: [Continent.SouthAmerica],
    coatOfArms: { png: '', svg: '' },
    startOfWeek: StartOfWeek.Monday,
    capitalInfo: { latlng: [-15.79, -47.88] },
    postalCode: { format: '#####-###', regex: '^(\\d{5})-(\\d{3})$' },
  };

  it('renders country details correctly', () => {
    render(<CountryDetailsTemplate countryDetails={mockCountryDetails} />);

    expect(screen.getByText('Brazil')).toBeInTheDocument();
    expect(screen.getByText('Brasil')).toBeInTheDocument();
    expect(screen.getByText('214.000.000')).toBeInTheDocument();
    expect(screen.getByText('Americas')).toBeInTheDocument();
    expect(screen.getByText('South America')).toBeInTheDocument();
    expect(screen.getByText('Brasília')).toBeInTheDocument();
    expect(screen.getByText('.br')).toBeInTheDocument();
    expect(screen.getByText('Brazilian Real')).toBeInTheDocument();
    expect(screen.getByText('Portuguese')).toBeInTheDocument();
    expect(screen.getByText('Argentina')).toBeInTheDocument();
    expect(screen.getByText('Uruguay')).toBeInTheDocument();
  });

  it('renders back button correctly', () => {
    render(<CountryDetailsTemplate countryDetails={mockCountryDetails} />);
    const backButton = screen.getByText('Back');
    expect(backButton).toBeInTheDocument();
    expect(backButton.closest('a')).toHaveAttribute('href', '/');
  });

  it('handles missing borders correctly', () => {
    const countryWithoutBorders: ICountryDetails = {
      ...mockCountryDetails,
      borders: undefined,
      bordersNormalized: undefined,
    };
    render(<CountryDetailsTemplate countryDetails={countryWithoutBorders} />);
    expect(screen.queryByText('Border Countries:')).not.toBeInTheDocument();
  });

  it('handles empty borders array correctly', () => {
    const countryWithEmptyBorders: ICountryDetails = {
      ...mockCountryDetails,
      borders: [],
      bordersNormalized: [],
    };
    render(<CountryDetailsTemplate countryDetails={countryWithEmptyBorders} />);
    expect(screen.queryByText('Border Countries:')).not.toBeInTheDocument();
  });

  it('handles missing flag alt text correctly', () => {
    const countryWithoutFlagAlt: ICountryDetails = {
      ...mockCountryDetails,
      flags: {
        png: '/flag.png',
        svg: '/flag.svg',
      },
    };
    render(<CountryDetailsTemplate countryDetails={countryWithoutFlagAlt} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('alt', 'Brazil');
  });

  it('handles borders with different lengths correctly', () => {
    const countryWithDifferentBordersLength: ICountryDetails = {
      ...mockCountryDetails,
      borders: ['ARG'],
      bordersNormalized: ['Argentina', 'Uruguay'],
    };
    render(
      <CountryDetailsTemplate
        countryDetails={countryWithDifferentBordersLength}
      />
    );
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);
    expect(links[1]).toHaveAttribute('href', '/country/ARG');
    expect(links[2]).toHaveAttribute('href', '/country/Uruguay');
  });

  it('handles missing normalized borders but with borders correctly', () => {
    const countryWithoutNormalizedBorders: ICountryDetails = {
      ...mockCountryDetails,
      bordersNormalized: undefined,
    };
    render(
      <CountryDetailsTemplate
        countryDetails={countryWithoutNormalizedBorders}
      />
    );
    expect(screen.queryByText('Border Countries:')).not.toBeInTheDocument();
  });

  it('handles missing borders but with normalized borders correctly', () => {
    const countryWithoutBordersButNormalized: ICountryDetails = {
      ...mockCountryDetails,
      borders: undefined,
    };
    render(
      <CountryDetailsTemplate
        countryDetails={countryWithoutBordersButNormalized}
      />
    );
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);
    expect(links[1]).toHaveAttribute('href', '/country/Argentina');
    expect(links[2]).toHaveAttribute('href', '/country/Uruguay');
  });
});
