'use client';
import React from 'react';
import styles from './HomeTemplate.module.scss';
import { CountrySummary } from '@/types/data';
import { FilterSection } from './utils/FilterSection';
import { CountriesGrid } from './utils/CountriesGrid';
import { useCountriesFilter } from '@/hooks';

type HomeTemplateProps = Readonly<{
  countries: CountrySummary[];
}>;

export const HomeTemplate = ({ countries }: HomeTemplateProps) => {
  const {
    search,
    setSearch,
    region,
    setRegion,
    isFiltering,
    filteredCountries,
    uniqueRegions,
  } = useCountriesFilter(countries);

  return (
    <div className={styles.homeTemplate}>
      <FilterSection
        search={search}
        setSearch={setSearch}
        region={region}
        setRegion={setRegion}
        uniqueRegions={uniqueRegions}
      />
      <CountriesGrid countries={filteredCountries} isFiltering={isFiltering} />
    </div>
  );
};
