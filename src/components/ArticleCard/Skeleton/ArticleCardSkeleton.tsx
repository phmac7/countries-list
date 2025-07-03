'use client';
import React from 'react';
import styles from './ArticleCardSkeleton.module.scss';

export const ArticleCardSkeleton = () => {
  return (
    <div className={styles.skeleton} data-testid="article-card-skeleton">
      <div className={styles.skeleton__image} data-testid="skeleton-image" />
      <div className={styles.skeleton__content} data-testid="skeleton-content">
        <div className={styles.skeleton__title} data-testid="skeleton-title" />
        <div className={styles.skeleton__text} data-testid="skeleton-text" />
        <div className={styles.skeleton__text} data-testid="skeleton-text" />
        <div className={styles.skeleton__text} data-testid="skeleton-text" />
      </div>
    </div>
  );
};
