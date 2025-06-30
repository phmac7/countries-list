
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import CountryPage from './page';
import { getCountryBySlug } from '@/lib/countries/getCountryBySlug';
import { CountryTemplate } from '@/templates/CountryTemplate';

jest.mock('@/lib/countries/getCountryBySlug');
jest.mock('@/templates/CountryTemplate', () => ({
  __esModule: true,
  CountryTemplate: jest.fn((props) => (
    <div data-testid="country-template">{props?.country?.name?.common}</div>
  )),
}));

const mockGetCountryBySlug = getCountryBySlug as jest.Mock;
const mockCountryTemplate = CountryTemplate as jest.Mock;

describe('CountryPage', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch country data and render the CountryTemplate with the correct country', async () => {
    const mockCountry = { name: { common: 'Brazil' } };
    mockGetCountryBySlug.mockResolvedValue([mockCountry]);

    const params = { slug: 'brazil' };
    const page = await CountryPage({ params: Promise.resolve(params) });
    render(page);

    expect(getCountryBySlug).toHaveBeenCalledWith('brazil');
    expect(mockCountryTemplate).toHaveBeenCalledWith({ country: mockCountry }, undefined);
    expect(screen.getByTestId('country-template')).toHaveTextContent('Brazil');
  });

  it('should throw an error if no country is found', async () => {
    mockGetCountryBySlug.mockResolvedValue([]);
    const params = { slug: 'non-existent' };
    await expect(CountryPage({ params: Promise.resolve(params) })).rejects.toThrow();
  });
});
