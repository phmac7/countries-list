export const getCountryBySlug = async (cca3: string) => {
  const res = await fetch(`https://restcountries.com/v3.1/alpha/${cca3}`, {
    cache: 'force-cache',
  });

  if (!res.ok) throw new Error('Erro ao buscar o país');
  return res.json();
};
