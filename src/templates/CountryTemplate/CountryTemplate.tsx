import React from 'react';
import styles from './CountryTemplate.module.scss';

interface CountryTemplateProps {
  country: {
    name?: {
      common?: string;
    };
  };
}

export const CountryTemplate: React.FC<CountryTemplateProps> = ({
  country,
}) => {
  return (
    <div className={styles.countryTemplate}>
      {country?.name?.common && <h1>{country.name.common}</h1>}
    </div>
  );
};
