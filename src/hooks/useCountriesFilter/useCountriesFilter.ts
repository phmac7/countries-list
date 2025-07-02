import { CountrySummary } from '@/types/data';
import { useCallback, useEffect, useMemo, useState, useRef } from 'react';

export const useCountriesFilter = (countries: CountrySummary[]) => {
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('all');
  const [isFiltering, setIsFiltering] = useState(false);
  const isFirstRender = useRef(true);

  const uniqueRegions = useMemo(
    () => [...new Set(countries?.map((country) => country.region))],
    [countries]
  );

  const filterCountries = useCallback(
    (countries: CountrySummary[], search: string, region: string) => {
      return countries.filter((country) => {
        const name =
          typeof country.name === 'string' ? country.name : country.name.common;
        const matchesSearch = name.toLowerCase().includes(search.toLowerCase());
        const matchesRegion = region === 'all' || country.region === region;
        return matchesSearch && matchesRegion;
      });
    },
    []
  );

  const filteredCountries = useMemo(
    () => filterCountries(countries, search, region),
    [countries, search, region, filterCountries]
  );

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setIsFiltering(true);
    const timer = setTimeout(() => {
      setIsFiltering(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [search, region]);

  return {
    search,
    setSearch,
    region,
    setRegion,
    isFiltering,
    filteredCountries: filteredCountries,
    uniqueRegions,
  };
};
