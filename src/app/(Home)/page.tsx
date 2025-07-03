import { getCountriesSummary } from '@/lib/countries/getCountries';
import { HomeTemplate } from '@/templates';

export default async function Home() {
  const countries = await getCountriesSummary();
  return (
    <div data-testid="home-content">
      <HomeTemplate countries={countries} />
    </div>
  );
}
