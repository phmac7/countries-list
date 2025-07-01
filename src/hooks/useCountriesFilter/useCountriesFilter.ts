import { CountrySummary } from '@/types/data';
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useDeferredValue,
  useRef,
} from 'react';

const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const useCountriesFilter = (countries: CountrySummary[]) => {
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('all');
  const [isFiltering, setIsFiltering] = useState(false);
  const isFirstRender = useRef(true);

  const debouncedSearch = useDebounce(search, 300);

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
    () => filterCountries(countries, debouncedSearch, region),
    [countries, debouncedSearch, region, filterCountries]
  );

  const deferredFilteredCountries = useDeferredValue(filteredCountries);

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
    filteredCountries: deferredFilteredCountries,
    uniqueRegions,
  };
};
