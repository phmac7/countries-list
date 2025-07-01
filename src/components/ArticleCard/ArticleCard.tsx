import Image from 'next/image';
import React from 'react';
import styles from './ArticleCard.module.scss';
import Link from 'next/link';

interface ArticleCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  population: number;
  region: string;
  capital: string;
  cca3: string;
}

export const ArticleCard: React.FC<Readonly<ArticleCardProps>> = ({
  imageSrc,
  imageAlt,
  title,
  population,
  region,
  capital,
  cca3,
}) => {
  return (
    <article className={styles.articleCard}>
      <Link href={`/country/${cca3}`}>
        <div className={styles.articleCard__image}>
          <Image src={imageSrc} alt={imageAlt} width={264} height={160} />
        </div>
        <div className={styles.articleCard__content}>
          <h2 className={styles.articleCard__title}>{title}</h2>
          <div>
            <p className={styles.articleCard__text}>
              <span className={styles.articleCard__textLabel}>Population:</span>{' '}
              {population}
            </p>
            <p className={styles.articleCard__text}>
              <span className={styles.articleCard__textLabel}>Region:</span>{' '}
              {region}
            </p>
            <p className={styles.articleCard__text}>
              <span className={styles.articleCard__textLabel}>Capital:</span>{' '}
              {capital}
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
};
