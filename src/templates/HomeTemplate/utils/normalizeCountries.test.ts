import { CountrySummary, Region } from '@/types/data';
import { normalizeCountry } from './normalizeCountries';

describe('normalizeCountry', () => {
  it('normalizes country when name and flags are objects', () => {
    const country: CountrySummary = {
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
        png: 'brazil.png',
        svg: 'brazil.svg',
        alt: 'Brazilian flag',
      },
      capital: ['Brasília'],
      region: Region.Americas,
      population: 100000,
      cca3: 'BRA',
    };

    const result = normalizeCountry(country);

    expect(result).toEqual({
      title: 'Brazil',
      imageSrc: 'brazil.png',
      imageAlt: 'Brazilian flag',
      cca3: 'BRA',
      capital: 'Brasília',
      population: 100000,
      region: Region.Americas,
    });
  });

  it('normalizes country when name and flags are strings', () => {
    const country: CountrySummary = {
      name: 'Argentina',
      flags: 'argentina.png',
      capital: 'Buenos Aires',
      region: Region.Americas,
      population: 100000,
      cca3: 'ARG',
    };

    const result = normalizeCountry(country);

    expect(result).toEqual({
      title: 'Argentina',
      imageSrc: 'argentina.png',
      imageAlt: 'argentina.png',
      cca3: 'ARG',
      capital: 'Buenos Aires',
      population: 100000,
      region: Region.Americas,
    });
  });

  it('handles capital as either string or string array', () => {
    const countryArrayCapital: CountrySummary = {
      name: 'Chile',
      flags: 'chile.png',
      capital: ['Santiago'],
      region: Region.Americas,
      population: 100000,
      cca3: 'CHL',
    };

    const countryStringCapital: CountrySummary = {
      name: 'Chile',
      flags: 'chile.png',
      capital: 'Santiago',
      region: Region.Americas,
      population: 100000,
      cca3: 'CHL',
    };

    expect(normalizeCountry(countryArrayCapital).capital).toBe('Santiago');
    expect(normalizeCountry(countryStringCapital).capital).toBe('Santiago');
  });

  it('handles empty capital array', () => {
    const country: CountrySummary = {
      name: 'Country',
      flags: 'flag.png',
      capital: [],
      region: Region.Americas,
      population: 100000,
      cca3: 'CTY',
    };

    const result = normalizeCountry(country);
    expect(result.capital).toBe('');
  });

  it('handles undefined capital', () => {
    const country: CountrySummary = {
      name: 'Country',
      flags: 'flag.png',
      capital: undefined as unknown as string[],
      region: Region.Americas,
      population: 100000,
      cca3: 'CTY',
    };

    const result = normalizeCountry(country);
    expect(result.capital).toBe('');
  });

  it('uses png url as alt text when alt is missing', () => {
    const country: CountrySummary = {
      name: 'Country',
      flags: {
        png: 'flag.png',
        svg: 'flag.svg',
        alt: '',
      },
      capital: ['Capital'],
      region: Region.Americas,
      population: 100000,
      cca3: 'CTY',
    };

    const result = normalizeCountry(country);
    expect(result.imageAlt).toBe('flag.png');
  });
});
