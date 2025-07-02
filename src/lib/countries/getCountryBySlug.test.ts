import { getCountryBySlug } from './getCountryBySlug';

describe('getCountryBySlug', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return country data when fetch is successful', async () => {
    const mockCountryData = [{ name: { common: 'Brazil' } }];
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockCountryData),
    });

    const result = await getCountryBySlug('brazil');
    expect(result).toEqual(mockCountryData);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://restcountries.com/v3.1/alpha/brazil',
      {
        cache: 'force-cache',
      }
    );
  });

  it('should throw an error when fetch is not successful', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(getCountryBySlug('invalid-country')).rejects.toThrow(
      'Error fetching country'
    );
    expect(global.fetch).toHaveBeenCalledWith(
      'https://restcountries.com/v3.1/alpha/invalid-country',
      {
        cache: 'force-cache',
      }
    );
  });
});
