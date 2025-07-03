import React from 'react';
import Image from 'next/image';
import styles from './ArticleDetails.module.scss';
import { Button } from '@/components';

interface ArticleDetailsProps {
  title: string;
  description: {
    label: string;
    value: string | string[] | undefined;
  }[];
  image?: string;
  imageAlt?: string;
  chips?: {
    label: string;
    values: {
      label: string;
      href: string;
    }[];
  };
}

const formatValue = (value: string | string[] | undefined): string => {
  if (!value) return '';
  if (typeof value === 'string') return value;
  return value.join(', ');
};

export const ArticleDetails: React.FC<Readonly<ArticleDetailsProps>> = ({
  title,
  description,
  image,
  imageAlt,
  chips,
}) => {
  return (
    <div className={styles.articleDetails}>
      {image && imageAlt && (
        <div className={styles.articleDetails__image}>
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>
      )}
      <div className={styles.articleDetails__content}>
        <h2>{title}</h2>
        <div className={styles.articleDetails__description}>
          {description.map((item, index) => (
            <p key={index} className={styles.articleDetails__text}>
              <span className={styles.articleDetails__textLabel}>
                {item.label}:
              </span>{' '}
              {formatValue(item.value)}
            </p>
          ))}
        </div>
        {chips && chips.values.length > 0 && (
          <div className={styles.articleDetails__chips}>
            <span className={styles.articleDetails__textLabel}>
              {chips.label}:
            </span>
            <div className={styles.articleDetails__chipsList}>
              {chips.values.map((value, index) => (
                <Button
                  key={index}
                  label={value.label}
                  href={`/country/${value.href}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
