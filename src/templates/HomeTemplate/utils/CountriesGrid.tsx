import { ArticleCard, ArticleCardSkeleton, GridContainer } from '@/components';
import { CountrySummary } from '@/types/data';
import { normalizeCountry } from './normalizeCountries';
import React, { memo, useCallback } from 'react';
import styles from '../HomeTemplate.module.scss';
import { useInfiniteScroll } from '@/hooks';

type CountriesGridProps = Readonly<{
  countries: CountrySummary[];
  isFiltering: boolean;
}>;

const CountryCard = memo<Readonly<{ country: CountrySummary }>>(
  ({ country }) => {
    const normalizedData = normalizeCountry(country);
    return (
      <ArticleCard
        {...normalizedData}
        population={country.population}
        region={country.region}
      />
    );
  }
);
CountryCard.displayName = 'CountryCard';

export const CountriesGrid: React.FC<CountriesGridProps> = ({
  countries,
  isFiltering,
}) => {
  const { displayedItems, hasMore, measureRef } = useInfiniteScroll(countries);

  const renderItem = useCallback(
    (country: CountrySummary) => (
      <CountryCard key={country.cca3} country={country} />
    ),
    []
  );

  const renderSkeleton = useCallback(
    (_: unknown, index: number) => (
      <ArticleCardSkeleton key={`skeleton-${index}`} />
    ),
    []
  );

  if (isFiltering) {
    return (
      <div className={styles.homeTemplate__gridContent}>
        <GridContainer
          array={Array(8).fill(null)}
          renderItem={renderSkeleton}
        />
      </div>
    );
  }

  return (
    <>
      <div className={styles.homeTemplate__gridContent}>
        <GridContainer array={displayedItems} renderItem={renderItem} />
      </div>
      {hasMore && (
        <div
          ref={measureRef}
          className={styles.homeTemplate__loading}
          data-testid="homeTemplate__loading"
        >
          <div
            className={styles.homeTemplate__loadingSpinner}
            data-testid="homeTemplate__loadingSpinner"
          ></div>
        </div>
      )}
    </>
  );
};
