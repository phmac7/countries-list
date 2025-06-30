import { render, screen, fireEvent } from '@testing-library/react';
import { SelectBar } from './SelectBar';

describe('SelectBar', () => {
  const defaultProps = {
    region: '',
    setRegion: jest.fn(),
    uniqueRegions: ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'],
  };

  it('should render select bar with default props', () => {
    render(<SelectBar {...defaultProps} />);

    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('should render select bar with unique regions', () => {
    render(<SelectBar {...defaultProps} />);

    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('should call setRegion when a region is selected', () => {
    const setRegion = jest.fn();
    render(<SelectBar {...defaultProps} setRegion={setRegion} />);

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'Africa' },
    });

    expect(setRegion).toHaveBeenCalledWith('Africa');
  });

  it('should render select bar with default label', () => {
    render(<SelectBar {...defaultProps} />);

    expect(screen.getByText('Filter by Region')).toBeInTheDocument();
  });
});
