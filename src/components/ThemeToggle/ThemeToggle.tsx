'use client';

import { useTheme } from '@/contexts';
import styles from './ThemeToggle.module.scss';
import { FiMoon, FiSun } from 'react-icons/fi';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className={styles.themeToggle}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
      <span className={styles.themeText}>
        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      </span>
    </button>
  );
};
