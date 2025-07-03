import React from 'react';
import styles from './CountryDetailsTemplateSkeleton.module.scss';
import { ArticleDetailsSkeleton, ButtonSkeleton } from '@/components';

export const CountryDetailsTemplateSkeleton = () => {
  return (
    <>
      <div
        className={styles.CountryDetailsTemplateSkeleton}
        data-testid="country-details-template-skeleton"
      >
        <ButtonSkeleton />
        <ArticleDetailsSkeleton />
      </div>
    </>
  );
};
