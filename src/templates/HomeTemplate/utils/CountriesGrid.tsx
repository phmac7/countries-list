'use client';
import { ArticleCard, GridContainer } from '@/components';
import { CountrySummary } from '@/types/data';
import { normalizeCountry } from './normalizeCountries';
import React, { memo } from 'react';
import styles from '../HomeTemplate.module.scss';

type CountriesGridProps = Readonly<{
  countries: CountrySummary[];
  isFiltering: boolean;
}>;

const CountryCard = memo<Readonly<{ country: CountrySummary }>>((props) => {
  const normalizedData = normalizeCountry(props.country);
  return (
    <ArticleCard
      {...normalizedData}
      population={props.country.population}
      region={props.country.region}
    />
  );
});
CountryCard.displayName = 'CountryCard';

export const CountriesGrid = memo<CountriesGridProps>((props) => {
  const renderItem = React.useCallback(
    (country: CountrySummary) => (
      <CountryCard key={country.cca3} country={country} />
    ),
    []
  );

  return (
    <div className={styles.homeTemplate__gridContent}>
      {props.isFiltering && (
        <div className={styles.homeTemplate__loading}>
          <div
            className={styles.homeTemplate__loadingSpinner}
            data-testid="loading-spinner"
          />
        </div>
      )}
      <div className={props.isFiltering ? styles.homeTemplate__gridBlur : ''}>
        <GridContainer array={props.countries} renderItem={renderItem} />
      </div>
    </div>
  );
});
CountriesGrid.displayName = 'CountriesGrid';
