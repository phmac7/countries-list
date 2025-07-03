import { ICountryDetails } from '@/types/data';

export interface IDescription {
  label: string;
  value: string | undefined;
}

export const formatLanguages = (
  languages: { [key: string]: string } | undefined
): string => {
  if (!languages) return '';
  return Object.values(languages).join(', ');
};

export const formatCurrencies = (
  currencies: ICountryDetails['currencies']
): string => {
  if (!currencies) return '';
  return Object.values(currencies)
    .map((currency) => currency.name)
    .join(', ');
};

export const getCountryDescription = (
  countryDetails: ICountryDetails
): IDescription[] => [
  {
    label: 'Native Name',
    value:
      countryDetails?.name?.nativeName?.[
        Object.keys(countryDetails?.name?.nativeName || {})[0]
      ]?.common,
  },
  {
    label: 'Population',
    value: countryDetails?.population?.toLocaleString('pt-BR'),
  },
  {
    label: 'Region',
    value: countryDetails?.region,
  },
  {
    label: 'Sub Region',
    value: countryDetails?.subregion,
  },
  {
    label: 'Capital',
    value: Array.isArray(countryDetails?.capital)
      ? countryDetails?.capital.join(', ')
      : countryDetails?.capital,
  },
  {
    label: 'Top Level Domain',
    value: countryDetails?.tld?.join(', '),
  },
  {
    label: 'Currencies',
    value: formatCurrencies(countryDetails?.currencies),
  },
  {
    label: 'Languages',
    value: formatLanguages(countryDetails?.languages),
  },
];
