import { getCountryBySlug } from './getCountryBySlug';

describe('getCountryBySlug', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('fetches country data successfully', async () => {
    const mockCountry = {
      name: { common: 'Brazil' },
      population: 214000000,
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([mockCountry]),
    });

    const result = await getCountryBySlug('BRA');
    expect(result).toEqual([mockCountry]);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://restcountries.com/v3.1/alpha/BRA',
      { cache: 'force-cache' }
    );
  });

  it('throws error when fetch fails', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(getCountryBySlug('INVALID')).rejects.toThrow(
      'Error fetching country'
    );
  });

  it('fetches border countries data successfully', async () => {
    const mockCountry = {
      name: { common: 'Brazil' },
      borders: ['ARG', 'URY'],
    };

    const mockArgentina = {
      name: { common: 'Argentina' },
    };

    const mockUruguay = {
      name: { common: 'Uruguay' },
    };

    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([mockCountry]),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([mockArgentina]),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([mockUruguay]),
      });

    const result = await getCountryBySlug('BRA');
    expect(result[0].bordersNormalized).toEqual(['Argentina', 'Uruguay']);
    expect(global.fetch).toHaveBeenCalledTimes(3);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://restcountries.com/v3.1/alpha/BRA',
      { cache: 'force-cache' }
    );
    expect(global.fetch).toHaveBeenCalledWith(
      'https://restcountries.com/v3.1/alpha/ARG',
      { cache: 'force-cache' }
    );
    expect(global.fetch).toHaveBeenCalledWith(
      'https://restcountries.com/v3.1/alpha/URY',
      { cache: 'force-cache' }
    );
  });

  it('handles failed border country fetch gracefully', async () => {
    const mockCountry = {
      name: { common: 'Brazil' },
      borders: ['ARG', 'INVALID'],
    };

    const mockArgentina = {
      name: { common: 'Argentina' },
    };

    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([mockCountry]),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([mockArgentina]),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([{}]),
      });

    const result = await getCountryBySlug('BRA');
    expect(result[0].bordersNormalized).toEqual(['Argentina']);
  });
});
