import { render, screen, fireEvent } from '@testing-library/react';
import { FilterSection } from './FilterSection';

describe('FilterSection', () => {
  const mockProps = {
    search: '',
    setSearch: jest.fn(),
    region: 'all',
    setRegion: jest.fn(),
    uniqueRegions: ['Americas', 'Europe', 'Asia'],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<FilterSection {...mockProps} />);
    expect(
      screen.getByPlaceholderText('Search for a country...')
    ).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('renders all regions in the select bar', () => {
    render(<FilterSection {...mockProps} />);
    expect(
      screen.getByRole('option', { name: /filter by region/i })
    ).toBeInTheDocument();
    mockProps.uniqueRegions.forEach((region) => {
      expect(screen.getByRole('option', { name: region })).toBeInTheDocument();
    });
  });

  it('calls setSearch when typing in the search bar', () => {
    render(<FilterSection {...mockProps} />);
    const input = screen.getByPlaceholderText('Search for a country...');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(mockProps.setSearch).toHaveBeenCalledWith('test');
  });

  it('calls setRegion when selecting a region', () => {
    render(<FilterSection {...mockProps} />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'Americas' } });
    expect(mockProps.setRegion).toHaveBeenCalledWith('Americas');
  });

  it('displays the current search value', () => {
    render(<FilterSection {...mockProps} search="Brazil" />);
    const input = screen.getByPlaceholderText('Search for a country...');
    expect(input).toHaveValue('Brazil');
  });

  it('displays the current region value', () => {
    render(<FilterSection {...mockProps} region="Americas" />);
    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('Americas');
  });
});
