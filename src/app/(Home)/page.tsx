import { getCountriesSummary } from '@/lib/countries/getCountries';
import styles from './page.module.scss';
import { HomeTemplate } from '@/templates';

export default async function Home() {
  const countries = await getCountriesSummary();
  return (
    <div className={styles.page} data-testid="home-content">
      <HomeTemplate countries={countries} />
    </div>
  );
}
