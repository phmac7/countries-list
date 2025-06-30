import React from 'react';
import styles from './GridContainer.module.scss';

interface GridContainerProps<T> {
  array: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
}

export const GridContainer = <T,>({
  array,
  renderItem,
}: Readonly<GridContainerProps<T>>) => {
  return (
    <div className={styles.gridContainer}>
      {array.map((item, index) => (
        <div key={index}>{renderItem(item, index)}</div>
      ))}
    </div>
  );
};
