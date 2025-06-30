export const getCountryBySlug = async (slug: string) => {
  const res = await fetch(`https://restcountries.com/v3.1/name/${slug}`);

  if (!res.ok) throw new Error('Erro ao buscar o país');
  return res.json();
};
