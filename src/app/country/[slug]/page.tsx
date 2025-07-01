import { getCountryBySlug } from '@/lib/countries/getCountryBySlug';
import { CountryTemplate } from '@/templates/CountryTemplate';

export default async function CountryPage({
  params,
}: Readonly<{
  params: Promise<{ slug: string }>;
}>) {
  const paramsCca3 = (await params).slug;
  const countries = await getCountryBySlug(paramsCca3);

  if (!countries || countries.length === 0) {
    throw new Error('Country not found');
  }

  return <CountryTemplate country={countries[0]} />;
}
