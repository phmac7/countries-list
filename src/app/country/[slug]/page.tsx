import { getCountryBySlug } from '@/lib/countries/getCountryBySlug';
import { CountryTemplate } from '@/templates/CountryTemplate';

export default async function CountryPage({
  params,
}: {
  params: Readonly<Promise<{ slug: string }>>;
}) {
  const paramsSlug = (await params).slug;
  const countries = await getCountryBySlug(paramsSlug);

  if (!countries || countries.length === 0) {
    throw new Error('Country not found');
  }

  return <CountryTemplate country={countries[0]} />;
}
