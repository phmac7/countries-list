export const getCountriesSummary = async () => {
  const res = await fetch(
    'https://restcountries.com/v3.1/all?fields=name,flags,region,population,capital,cca3',
    {
      next: {
        revalidate: 3600,
      },
      headers: {
        'Cache-Control': 'public, max-age=3600, must-revalidate',
      },
    }
  );

  if (!res.ok) throw new Error('Error fetching countries');
  return res.json();
};
