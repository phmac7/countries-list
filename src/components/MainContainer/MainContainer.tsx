import React from 'react';
import styles from './MainContainer.module.scss';

const MainContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <main className={styles.mainContainer}>
      <div className={styles.mainContainer__content}>{children}</div>
    </main>
  );
};

export default MainContainer;
