import React from 'react';
import { ThemeToggle } from '@/components';
import styles from './Navbar.module.scss';

export const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__container}>
        <h1 className={styles.navbar__title}>Where in the world?</h1>
        <ThemeToggle />
      </div>
    </nav>
  );
};
