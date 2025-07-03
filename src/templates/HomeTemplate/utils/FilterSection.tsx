'use client';
import { SearchBar, SelectBar } from '@/components';
import React, { memo } from 'react';
import styles from '../HomeTemplate.module.scss';

type FilterSectionProps = Readonly<{
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  region: string;
  setRegion: React.Dispatch<React.SetStateAction<string>>;
  uniqueRegions: string[];
}>;

export const FilterSection = memo<FilterSectionProps>(
  ({ region, search, setRegion, setSearch, uniqueRegions }) => {
    return (
      <div className={styles.homeTemplate__filterContainer}>
        <SearchBar search={search} setSearch={setSearch} />
        <SelectBar
          region={region}
          setRegion={setRegion}
          uniqueRegions={uniqueRegions}
        />
      </div>
    );
  }
);
FilterSection.displayName = 'FilterSection';
