import { ThemeToggle } from '@/components/ThemeToggle';
import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles.page}>
      <ThemeToggle />
    </div>
  );
}
