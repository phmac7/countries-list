import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from './SearchBar';

describe('SearchBar', () => {
  const defaultProps = {
    search: '',
    setSearch: jest.fn(),
    placeholder: 'Search for a country...',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render search input with placeholder', () => {
    render(<SearchBar {...defaultProps} />);

    expect(
      screen.getByPlaceholderText('Search for a country...')
    ).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should render search icon', () => {
    const { container } = render(<SearchBar {...defaultProps} />);

    const searchIcon = container.querySelector('svg');
    expect(searchIcon).toBeInTheDocument();
    expect(searchIcon).toHaveStyle({ cursor: 'pointer' });
  });

  it('should update value on input change', () => {
    const setSearch = jest.fn();
    render(<SearchBar {...defaultProps} setSearch={setSearch} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Brazil' } });

    expect(setSearch).toHaveBeenCalledWith('Brazil');
  });

  it('should focus input when clicking the icon', () => {
    render(<SearchBar {...defaultProps} />);

    const input = screen.getByRole('textbox');
    const searchIcon = screen.getByTestId('search-icon');

    fireEvent.click(searchIcon);

    expect(document.activeElement).toBe(input);
  });

  it('should display controlled input value', () => {
    render(<SearchBar {...defaultProps} search="Brazil" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('Brazil');
  });

  it('should use default placeholder when not provided', () => {
    const { setSearch, search } = defaultProps;
    render(<SearchBar setSearch={setSearch} search={search} />);

    expect(
      screen.getByPlaceholderText('Search for a country...')
    ).toBeInTheDocument();
  });
});
