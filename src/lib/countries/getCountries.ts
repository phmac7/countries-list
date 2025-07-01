export const getCountriesSummary = async () => {
  const res = await fetch(
    'https://restcountries.com/v3.1/all?fields=name,flags,region,population,capital,cca3',
    {
      cache: 'force-cache',
    }
  );

  if (!res.ok) throw new Error('Erro ao buscar países');
  return res.json();
};
