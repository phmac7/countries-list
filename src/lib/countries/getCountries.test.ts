import { getCountriesSummary } from './getCountries';

describe('getCountries', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it('should return the countries correctly when fetch is successful', async () => {
    const mockData = [{ name: { common: 'Brazil' } }];
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    const result = await getCountriesSummary();
    expect(result).toEqual(mockData);
    expect(fetch).toHaveBeenCalledWith(
      'https://restcountries.com/v3.1/all?fields=name,flags,region,population,capital,cca3',
      { cache: 'force-cache' }
    );
  });

  it('should throw an error if the fetch fails', async () => {
    (fetch as jest.Mock).mockResolvedValue({ ok: false });

    await expect(getCountriesSummary()).rejects.toThrow(
      'Erro ao buscar países'
    );
  });
});
