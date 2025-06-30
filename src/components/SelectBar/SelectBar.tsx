import React from 'react';
import styles from './SelectBar.module.scss';

interface SelectBarProps {
  region: string;
  setRegion: (region: string) => void;
  uniqueRegions: string[];
  defaultLabel?: string;
}

export const SelectBar: React.FC<Readonly<SelectBarProps>> = ({
  region,
  setRegion,
  uniqueRegions,
  defaultLabel = 'Filter by Region',
}) => {
  return (
    <div className={styles.selectBar}>
      <select value={region} onChange={(e) => setRegion(e.target.value)}>
        <option value="all">{defaultLabel}</option>
        {uniqueRegions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
};
