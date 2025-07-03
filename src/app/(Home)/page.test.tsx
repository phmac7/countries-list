import { render, screen, waitFor } from '@testing-library/react';
import Home from '@/app/(Home)/page';
import { getCountriesSummary } from '@/lib/countries/getCountries';
import { HomeTemplate } from '@/templates';

jest.mock('@/lib/countries/getCountries', () => ({
  getCountriesSummary: jest.fn(),
}));

jest.mock('@/templates', () => ({
  HomeTemplate: jest.fn(({ countries }) => (
    <div data-testid="mock-home-template">{JSON.stringify(countries)}</div>
  )),
}));

describe('Home page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (getCountriesSummary as jest.Mock).mockResolvedValue([]);
  });

  it('renders the HomeTemplate with countries data and applies styles', async () => {
    const mockCountries = [{ name: 'Brazil' }, { name: 'Canada' }];
    (getCountriesSummary as jest.Mock).mockResolvedValue(mockCountries);

    render(await Home());

    expect(getCountriesSummary).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(HomeTemplate).toHaveBeenCalledTimes(1);
    });

    const homeContentDiv = screen.getByTestId('home-content');
    expect(homeContentDiv).toBeInTheDocument();

    expect(screen.getByTestId('mock-home-template')).toBeInTheDocument();
  });

  it('handles empty countries data gracefully', async () => {
    (getCountriesSummary as jest.Mock).mockResolvedValue([]);

    render(await Home());

    await waitFor(() => {
      expect(getCountriesSummary).toHaveBeenCalledTimes(1);
      expect(HomeTemplate).toHaveBeenCalledTimes(1);
    });

    expect(screen.getByTestId('home-content')).toBeInTheDocument();
  });
});
