import { getCountryBySlug } from '@/lib/countries/getCountryBySlug';
import { CountryDetailsTemplate } from '@/templates/CountryDetailsTemplate';

export default async function CountryPage({
  params,
}: Readonly<{
  params: Promise<{ slug: string }>;
}>) {
  const paramsCca3 = (await params).slug;
  const countryDetails = await getCountryBySlug(paramsCca3);

  if (!countryDetails || countryDetails.length === 0) {
    throw new Error('Country not found');
  }

  return <CountryDetailsTemplate countryDetails={countryDetails[0]} />;
}
