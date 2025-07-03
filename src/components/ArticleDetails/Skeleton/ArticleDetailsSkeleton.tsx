import React from 'react';
import styles from './ArticleDetailsSkeleton.module.scss';

export const ArticleDetailsSkeleton: React.FC = () => {
  return (
    <div
      className={styles.articleDetailsSkeleton}
      data-testid="article-details-skeleton"
    >
      <div
        className={styles.articleDetailsSkeleton__image}
        data-testid="article-details-skeleton-image"
      />
      <div
        className={styles.articleDetailsSkeleton__content}
        data-testid="article-details-skeleton-content"
      >
        <div
          className={styles.articleDetailsSkeleton__title}
          data-testid="article-details-skeleton-title"
        />
        <div className={styles.articleDetailsSkeleton__description}>
          <div
            className={styles.articleDetailsSkeleton__text}
            data-testid="article-details-skeleton-text"
          />
          <div
            className={styles.articleDetailsSkeleton__text}
            data-testid="article-details-skeleton-text"
          />
          <div
            className={styles.articleDetailsSkeleton__text}
            data-testid="article-details-skeleton-text"
          />
          <div
            className={styles.articleDetailsSkeleton__text}
            data-testid="article-details-skeleton-text"
          />
        </div>
        <div className={styles.articleDetailsSkeleton__chips}>
          <div
            className={styles.articleDetailsSkeleton__textLabel}
            data-testid="article-details-skeleton-text-label"
          />
          <div className={styles.articleDetailsSkeleton__chipsList}>
            <div
              className={styles.articleDetailsSkeleton__chip}
              data-testid="article-details-skeleton-chip"
            />
            <div
              className={styles.articleDetailsSkeleton__chip}
              data-testid="article-details-skeleton-chip"
            />
            <div
              className={styles.articleDetailsSkeleton__chip}
              data-testid="article-details-skeleton-chip"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
