import { ICountryDetails } from '@/types/data';

export const getCountryBySlug = async (
  cca3: string
): Promise<ICountryDetails[]> => {
  const res = await fetch(`https://restcountries.com/v3.1/alpha/${cca3}`, {
    cache: 'force-cache',
  });

  if (!res.ok) throw new Error('Error fetching country');
  const data = await res.json();
  if (data[0].borders) {
    const borders = await Promise.all(
      data[0].borders.map(async (border: string) => {
        const response = await fetch(
          `https://restcountries.com/v3.1/alpha/${border}`,
          { cache: 'force-cache' }
        );
        const borderData = await response.json();
        return borderData[0]?.name?.common;
      })
    );
    data[0].bordersNormalized = borders.filter(Boolean);
  }
  return data;
};
