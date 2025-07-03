import { ICountrySummary } from '@/types/data';

export const getCountriesSummary = async (): Promise<ICountrySummary[]> => {
  const res = await fetch(
    'https://restcountries.com/v3.1/all?fields=name,flags,region,population,capital,cca3',
    {
      cache: 'force-cache',
    }
  );

  if (!res.ok) throw new Error('Error fetching countries');
  return res.json();
};
