import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles.page} data-testid="home-content">
      <h1>Home</h1>
    </div>
  );
}
