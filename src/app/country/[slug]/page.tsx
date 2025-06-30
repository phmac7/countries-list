import { getCountryBySlug } from '@/lib/countries/getCountryBySlug';
import { CountryTemplate } from '@/templates/CountryTemplate';

export default async function CountryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const paramsSlug = (await params).slug;
  const countries = await getCountryBySlug(paramsSlug);

  return <CountryTemplate country={countries[0]} />;
}
