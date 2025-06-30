import { HomeTemplate } from '@/templates';
import styles from './page.module.scss';
import { getCountriesSummary } from '@/lib/countries/getCountries';

export default async function Home() {
  const countries = await getCountriesSummary();
  return (
    <div className={styles.page} data-testid="home-content">
      <HomeTemplate countries={countries} />
    </div>
  );
}
