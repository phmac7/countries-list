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

export const FilterSection = memo<FilterSectionProps>((props) => {
  return (
    <div className={styles.homeTemplate__filterContainer}>
      <SearchBar search={props.search} setSearch={props.setSearch} />
      <SelectBar
        region={props.region}
        setRegion={props.setRegion}
        uniqueRegions={props.uniqueRegions}
      />
    </div>
  );
});
FilterSection.displayName = 'FilterSection';
