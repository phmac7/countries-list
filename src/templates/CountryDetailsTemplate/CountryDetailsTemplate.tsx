import React, { useMemo } from 'react';
import styles from './CountryDetailsTemplate.module.scss';
import { ICountryDetails } from '@/types/data';
import { ArticleDetails, Button } from '@/components';
import { getCountryDescription } from './utils/format';

interface CountryTemplateProps {
  countryDetails: ICountryDetails;
}

export const CountryDetailsTemplate: React.FC<CountryTemplateProps> = ({
  countryDetails,
}) => {
  const description = useMemo(
    () => getCountryDescription(countryDetails),
    [countryDetails]
  );

  const borderCountries = useMemo(() => {
    if (!countryDetails?.bordersNormalized?.length) return undefined;
    return {
      label: 'Border Countries',
      values:
        countryDetails?.bordersNormalized?.map((border, index) => ({
          label: border,
          href: countryDetails?.borders?.[index] ?? border,
        })) ?? [],
    };
  }, [countryDetails?.borders, countryDetails?.bordersNormalized]);

  return (
    <div className={styles.countryDetailsTemplate}>
      <Button label="Back" icon="FaArrowLeft" href="/" />
      <ArticleDetails
        title={countryDetails?.name?.common ?? ''}
        description={description}
        image={countryDetails?.flags?.png}
        imageAlt={
          countryDetails?.flags?.alt ?? countryDetails?.name?.common ?? ''
        }
        chips={borderCountries}
      />
    </div>
  );
};
