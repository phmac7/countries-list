import {
  formatLanguages,
  formatCurrencies,
  getCountryDescription,
} from './format';
import {
  ICountryDetails,
  Region,
  Side,
  StartOfWeek,
  Status,
  Continent,
} from '@/types/data';

describe('format utils', () => {
  describe('formatLanguages', () => {
    it('formats languages correctly', () => {
      const languages = {
        eng: 'English',
        spa: 'Spanish',
        por: 'Portuguese',
      };
      expect(formatLanguages(languages)).toBe('English, Spanish, Portuguese');
    });

    it('returns empty string for undefined languages', () => {
      expect(formatLanguages(undefined)).toBe('');
    });

    it('handles single language correctly', () => {
      const languages = {
        eng: 'English',
      };
      expect(formatLanguages(languages)).toBe('English');
    });
  });

  describe('formatCurrencies', () => {
    it('formats currencies correctly', () => {
      const currencies = {
        USD: {
          name: 'US Dollar',
          symbol: '$',
        },
        EUR: {
          name: 'Euro',
          symbol: '€',
        },
      };
      expect(formatCurrencies(currencies)).toBe('US Dollar, Euro');
    });

    it('returns empty string for undefined currencies', () => {
      expect(formatCurrencies(undefined)).toBe('');
    });

    it('handles single currency correctly', () => {
      const currencies = {
        USD: {
          name: 'US Dollar',
          symbol: '$',
        },
      };
      expect(formatCurrencies(currencies)).toBe('US Dollar');
    });
  });

  describe('getCountryDescription', () => {
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

    it('returns correct description array', () => {
      const description = getCountryDescription(mockCountryDetails);
      expect(description).toEqual([
        { label: 'Native Name', value: 'Brasil' },
        { label: 'Population', value: '214.000.000' },
        { label: 'Region', value: 'Americas' },
        { label: 'Sub Region', value: 'South America' },
        { label: 'Capital', value: 'Brasília' },
        { label: 'Top Level Domain', value: '.br' },
        { label: 'Currencies', value: 'Brazilian Real' },
        { label: 'Languages', value: 'Portuguese' },
      ]);
    });

    it('handles missing native name correctly', () => {
      const countryWithoutNativeName = {
        ...mockCountryDetails,
        name: {
          common: 'Brazil',
          official: 'Federative Republic of Brazil',
        },
      };
      const description = getCountryDescription(countryWithoutNativeName);
      expect(description[0]).toEqual({
        label: 'Native Name',
        value: undefined,
      });
    });

    it('handles multiple capitals correctly', () => {
      const countryWithMultipleCapitals = {
        ...mockCountryDetails,
        capital: ['City1', 'City2'],
      };
      const description = getCountryDescription(countryWithMultipleCapitals);
      expect(description[4]).toEqual({
        label: 'Capital',
        value: 'City1, City2',
      });
    });

    it('handles missing optional fields correctly', () => {
      const countryWithMissingFields = {
        ...mockCountryDetails,
        capital: undefined,
        tld: undefined,
        currencies: undefined,
        languages: undefined,
      };
      const description = getCountryDescription(countryWithMissingFields);
      expect(description[4]).toEqual({ label: 'Capital', value: undefined });
      expect(description[5]).toEqual({
        label: 'Top Level Domain',
        value: undefined,
      });
      expect(description[6]).toEqual({ label: 'Currencies', value: '' });
      expect(description[7]).toEqual({ label: 'Languages', value: '' });
    });
  });
});
