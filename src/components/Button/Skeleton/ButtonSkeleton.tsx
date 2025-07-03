import React from 'react';
import styles from './ButtonSkeleton.module.scss';

export const ButtonSkeleton: React.FC = () => {
  return (
    <div className={styles.buttonSkeleton} data-testid="button-skeleton" />
  );
};
