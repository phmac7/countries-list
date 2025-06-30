'use client';
import { ArticleCard, GridContainer, SearchBar, SelectBar } from '@/components';
import React, { useMemo, useState } from 'react';
import styles from './HomeTemplate.module.scss';
import { CountrySummary } from '@/types/data';
import { normalizeCountry } from './utils/normalizeCountries';

export const HomeTemplate: React.FC<{ countries: CountrySummary[] }> = ({
  countries,
}) => {
  const uniqueRegions = [
    ...new Set(countries?.map((country) => country.region)),
  ];

  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('all');

  const filteredCountries = useMemo(
    () =>
      countries.filter((country) => {
        const matchesSearch =
          typeof country.name === 'string'
            ? country.name.toLowerCase().includes(search.toLowerCase())
            : country.name.common?.toLowerCase().includes(search.toLowerCase());
        const matchesRegion = region === 'all' || country.region === region;
        return matchesSearch && matchesRegion;
      }),
    [countries, search, region]
  );

  return (
    <div className={styles.homeTemplate}>
      <div className={styles.homeTemplate__filterContainer}>
        <SearchBar search={search} setSearch={setSearch} />
        <SelectBar
          region={region}
          setRegion={setRegion}
          uniqueRegions={uniqueRegions}
        />
      </div>
      <div className={styles.homeTemplate__gridContent}>
        <GridContainer
          array={filteredCountries}
          renderItem={(country) => {
            const data = normalizeCountry(country);
            return (
              <ArticleCard
                key={country.cca3}
                {...data}
                population={country.population}
                region={country.region}
              />
            );
          }}
        />
      </div>
    </div>
  );
};
