'use client';
import { SearchBar } from '@/components';
import React, { useState } from 'react';

export const HomeTemplate: React.FC = () => {
  const mockCountries = [
    { name: 'Germany', population: 81700, region: 'Europe', capital: 'Berlim' },
    { name: 'France', population: 67000, region: 'America', capital: 'Paris' },
    { name: 'Italy', population: 60000, region: 'Asia', capital: 'Rome' },
    { name: 'Spain', population: 47000, region: 'Europe', capital: 'Madrid' },
    {
      name: 'Portugal',
      population: 10000,
      region: 'Europe',
      capital: 'Lisboa',
    },
  ];

  const uniqueRegions = [
    ...new Set(mockCountries.map((country) => country.region)),
  ];

  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('all');

  const filteredCountries = mockCountries.filter((country) => {
    const matchesSearch = country.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesRegion = region === 'all' || country.region === region;
    return matchesSearch && matchesRegion;
  });

  return (
    <div>
      <div>
        <div>
          <SearchBar search={search} setSearch={setSearch} />
        </div>
        <div>
          <select value={region} onChange={(e) => setRegion(e.target.value)}>
            <option value="all">Filter by Region</option>
            {uniqueRegions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>
      </div>
      <ul>
        {filteredCountries.map((country) => (
          <li key={country.name}>{country.name}</li>
        ))}
      </ul>
    </div>
  );
};
