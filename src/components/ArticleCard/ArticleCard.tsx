'use client';
import Image from 'next/image';
import React, { memo } from 'react';
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

const shimmerBlurDataUrl = (w: number, h: number) => `
data:image/svg+xml;base64,${Buffer.from(
  `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`
).toString('base64')}`;

export const ArticleCard = memo(
  ({
    imageSrc,
    imageAlt,
    title,
    population,
    region,
    capital,
    cca3,
  }: Readonly<ArticleCardProps>) => {
    return (
      <article className={styles.articleCard}>
        <Link href={`/country/${cca3}`}>
          <div className={styles.articleCard__image}>
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
              loading="lazy"
              placeholder="blur"
              blurDataURL={shimmerBlurDataUrl(264, 160)}
            />
          </div>
          <div className={styles.articleCard__content}>
            <h2 className={styles.articleCard__title}>{title}</h2>
            <div>
              <p className={styles.articleCard__text}>
                <span className={styles.articleCard__textLabel}>
                  Population:
                </span>{' '}
                {population.toLocaleString()}
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
  }
);
ArticleCard.displayName = 'ArticleCard';
