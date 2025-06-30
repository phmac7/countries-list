import { HomeTemplate } from '@/templates';
import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles.page} data-testid="home-content">
      <HomeTemplate />
    </div>
  );
}
