import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Page from './page';
import { getCountryBySlug } from '@/lib/countries/getCountryBySlug';
import {
  ICountryDetails,
  Region,
  StartOfWeek,
  Status,
  Side,
  Continent,
} from '@/types/data';

jest.mock('@/lib/countries/getCountryBySlug');

const mockCountry: ICountryDetails = {
  name: {
    common: 'Brazil',
    official: 'Federative Republic of Brazil',
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
    png: '/brazil.png',
    svg: '/brazil.svg',
    alt: 'The flag of Brazil',
  },
  coatOfArms: {
    png: '/coat.png',
    svg: '/coat.svg',
  },
  startOfWeek: StartOfWeek.Monday,
  capitalInfo: {
    latlng: [-15.79, -47.88],
  },
  car: {
    signs: ['BR'],
    side: Side.Right,
  },
  continents: [Continent.SouthAmerica],
  status: Status.OfficiallyAssigned,
  independent: true,
  landlocked: false,
  unMember: true,
  cca2: 'BR',
  cca3: 'BRA',
  idd: { root: '+5', suffixes: ['5'] },
  altSpellings: ['BR', 'Brasil'],
  latlng: [-10, -55],
  area: 8515770,
  demonyms: {
    eng: { f: 'Brazilian', m: 'Brazilian' },
    fra: { f: 'Brésilienne', m: 'Brésilien' },
  },
  flag: '🇧🇷',
  maps: {
    googleMaps: 'https://goo.gl/maps/waCKk21HeeqFzkNC9',
    openStreetMaps: 'https://www.openstreetmap.org/relation/59470',
  },
  timezones: ['UTC-05:00', 'UTC-04:00', 'UTC-03:00', 'UTC-02:00'],
  translations: {
    por: { official: 'República Federativa do Brasil', common: 'Brasil' },
  },
  postalCode: {
    format: '#####-###',
    regex: '^(\\d{5})-(\\d{3})$',
  },
};

describe('Country Page', () => {
  it('renders country details', async () => {
    (getCountryBySlug as jest.Mock).mockResolvedValue([mockCountry]);

    render(await Page({ params: Promise.resolve({ slug: 'brazil' }) }));

    expect(screen.getByText('Brazil')).toBeInTheDocument();
  });

  it('handles error when country is not found', async () => {
    (getCountryBySlug as jest.Mock).mockResolvedValue([]);

    await expect(
      Page({ params: Promise.resolve({ slug: 'invalid' }) })
    ).rejects.toThrow('Country not found');
  });
});
