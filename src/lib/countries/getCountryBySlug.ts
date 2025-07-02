export const getCountryBySlug = async (cca3: string) => {
  const res = await fetch(`https://restcountries.com/v3.1/alpha/${cca3}`, {
    cache: 'force-cache',
  });

  if (!res.ok) throw new Error('Error fetching country');
  return res.json();
};
