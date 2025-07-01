import { CountrySummary } from '@/types/data';

type NormalizedCountry = {
  title: string;
  imageSrc: string;
  imageAlt: string;
  cca3: string;
  capital: string;
};

export const normalizeCountry = (
  country: CountrySummary
): NormalizedCountry & Pick<CountrySummary, 'population' | 'region'> => {
  const name =
    typeof country.name === 'string' ? country.name : country.name.common;
  const flag =
    typeof country.flags === 'string' ? country.flags : country.flags.png;
  const flagAlt =
    typeof country.flags === 'string'
      ? country.flags
      : country.flags.alt || country.flags.png;
  const capital = Array.isArray(country?.capital)
    ? country.capital[0] || ''
    : country.capital || '';

  return {
    title: name,
    imageSrc: flag,
    imageAlt: flagAlt,
    cca3: country.cca3,
    capital,
    population: country.population,
    region: country.region,
  };
};
