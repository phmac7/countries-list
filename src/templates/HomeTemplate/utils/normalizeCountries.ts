import { CountrySummary } from '@/types/data';

export const normalizeCountry = (country: CountrySummary) => {
  const name =
    typeof country.name === 'string' ? country.name : country.name.common;
  const flag =
    typeof country.flags === 'string' ? country.flags : country.flags.png;
  const flagAlt =
    typeof country.flags === 'string' ? country.flags : country.flags.alt;
  const capital = Array.isArray(country.capital)
    ? country.capital[0]
    : country.capital;

  return {
    title: name,
    imageSrc: flag,
    imageAlt: flagAlt,
    cca3: country.cca3,
    capital,
  };
};
