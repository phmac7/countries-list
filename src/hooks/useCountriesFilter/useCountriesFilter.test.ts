import { renderHook, act } from '@testing-library/react';
import { useCountriesFilter } from './useCountriesFilter';
import { CountrySummary, Region } from '@/types/data';

const mockCountries: CountrySummary[] = [
  {
    name: {
      common: 'Brazil',
      official: 'Brazil',
      nativeName: {
        por: {
          common: 'Brasil',
          official: 'Brasil',
        },
      },
    },
    flags: {
      png: 'https://flagcdn.com/br.svg',
      svg: 'https://flagcdn.com/br.svg',
      alt: 'Brazil',
    },
    region: Region.Americas,
    population: 100000,
    capital: ['Brasília'],
    cca3: 'BRA',
  },
  {
    name: {
      common: 'Argentina',
      official: 'Argentina',
      nativeName: {
        spa: {
          common: 'Argentina',
          official: 'Argentina',
        },
      },
    },
    flags: {
      png: 'https://flagcdn.com/ar.svg',
      svg: 'https://flagcdn.com/ar.svg',
      alt: 'Argentina',
    },
    region: Region.Americas,
    population: 103,
    capital: ['Buenos Aires'],
    cca3: 'ARG',
  },
  {
    name: {
      common: 'Japan',
      official: 'Japan',
      nativeName: {
        jpn: {
          common: '日本',
          official: '日本',
        },
      },
    },
    flags: {
      png: 'https://flagcdn.com/jp.svg',
      svg: 'https://flagcdn.com/jp.svg',
      alt: 'Japan',
    },
    region: Region.Asia,
    population: 125000000,
    capital: ['Tokyo'],
    cca3: 'JPN',
  },
];

jest.useFakeTimers();

describe('useCountriesFilter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('initializes with default values', () => {
    const { result } = renderHook(() => useCountriesFilter(mockCountries));
    expect(result.current.search).toBe('');
    expect(result.current.region).toBe('all');
    expect(result.current.isFiltering).toBe(false);
    expect(result.current.filteredCountries).toEqual(mockCountries);
    expect(result.current.uniqueRegions).toEqual([
      Region.Americas,
      Region.Asia,
    ]);
  });

  it('filters countries by search term with debounce', async () => {
    const { result } = renderHook(() => useCountriesFilter(mockCountries));

    act(() => {
      result.current.setSearch('Brazil');
    });

    // Initially, all countries should be visible
    expect(result.current.filteredCountries).toEqual(mockCountries);
    expect(result.current.isFiltering).toBe(true);

    // After debounce time
    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current.filteredCountries).toHaveLength(1);
    const firstCountry = result.current.filteredCountries[0];
    expect(
      typeof firstCountry.name === 'string'
        ? firstCountry.name
        : firstCountry.name.common
    ).toBe('Brazil');
    expect(result.current.isFiltering).toBe(false);
  });

  it('filters countries by region', () => {
    const { result } = renderHook(() => useCountriesFilter(mockCountries));

    act(() => {
      result.current.setRegion(Region.Americas);
    });

    expect(result.current.filteredCountries).toHaveLength(2);
    expect(
      result.current.filteredCountries.every(
        (c) => c.region === Region.Americas
      )
    ).toBe(true);
  });

  it('filters countries by both search and region', () => {
    const { result } = renderHook(() => useCountriesFilter(mockCountries));

    act(() => {
      result.current.setRegion(Region.Americas);
      result.current.setSearch('Brazil');
    });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current.filteredCountries).toHaveLength(1);
    const firstCountry = result.current.filteredCountries[0];
    expect(
      typeof firstCountry.name === 'string'
        ? firstCountry.name
        : firstCountry.name.common
    ).toBe('Brazil');
  });

  it('handles string name type in filtering', () => {
    const mockCountriesWithStringName: CountrySummary[] = [
      {
        name: 'Brazil',
        flags: 'https://flagcdn.com/br.svg',
        region: Region.Americas,
        population: 100000,
        capital: ['Brasília'],
        cca3: 'BRA',
      },
    ];

    const { result } = renderHook(() =>
      useCountriesFilter(mockCountriesWithStringName)
    );

    act(() => {
      result.current.setSearch('Brazil');
    });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current.filteredCountries).toHaveLength(1);
    expect(result.current.filteredCountries[0].name).toBe('Brazil');
  });

  it('shows isFiltering state during search', () => {
    const { result } = renderHook(() => useCountriesFilter(mockCountries));

    act(() => {
      result.current.setSearch('Brazil');
    });

    expect(result.current.isFiltering).toBe(true);

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current.isFiltering).toBe(false);
  });

  it('shows isFiltering state during region change', () => {
    const { result } = renderHook(() => useCountriesFilter(mockCountries));

    act(() => {
      result.current.setRegion(Region.Americas);
    });

    expect(result.current.isFiltering).toBe(true);

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current.isFiltering).toBe(false);
  });
});
