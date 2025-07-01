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
    <div className={styles.gridContainer} data-testid="grid-container">
      {array.map((item, index) => (
        <div key={`grid-item-${index}-${JSON.stringify(item)}`}>
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
};
