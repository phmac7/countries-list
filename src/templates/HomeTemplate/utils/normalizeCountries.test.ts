import { CountrySummary } from '@/types/data';
import { normalizeCountry } from './normalizeCountries';

describe('normalizeCountry', () => {
  it('normalizes country when name and flags are objects', () => {
    const country: CountrySummary = {
      name: { common: 'Brazil' },
      flags: { png: 'brazil.png', alt: 'Brazilian flag' },
      capital: ['Brasília'],
    } as never;

    const result = normalizeCountry(country);

    expect(result).toEqual({
      title: 'Brazil',
      imageSrc: 'brazil.png',
      imageAlt: 'Brazilian flag',
      slug: 'Brazil',
      capital: 'Brasília',
    });
  });

  it('normalizes country when name and flags are strings', () => {
    const country: CountrySummary = {
      name: 'Argentina',
      flags: 'argentina.png',
      capital: 'Buenos Aires',
    } as never;

    const result = normalizeCountry(country);

    expect(result).toEqual({
      title: 'Argentina',
      imageSrc: 'argentina.png',
      imageAlt: 'argentina.png',
      slug: 'Argentina',
      capital: 'Buenos Aires',
    });
  });

  it('handles capital as either string or string array', () => {
    const countryArrayCapital: CountrySummary = {
      name: 'Chile',
      flags: 'chile.png',
      capital: ['Santiago'],
    } as never;

    const countryStringCapital: CountrySummary = {
      name: 'Chile',
      flags: 'chile.png',
      capital: 'Santiago',
    } as never;

    expect(normalizeCountry(countryArrayCapital).capital).toBe('Santiago');
    expect(normalizeCountry(countryStringCapital).capital).toBe('Santiago');
  });
});
