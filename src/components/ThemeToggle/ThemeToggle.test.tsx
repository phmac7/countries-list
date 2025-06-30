import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeToggle as ActualThemeToggle } from './ThemeToggle';
import React from 'react';
import { useTheme } from '@/contexts';

jest.mock('@/contexts', () => ({
  useTheme: jest.fn(),
}));

jest.mock('@/components', () => ({
  ThemeToggle: () => <ActualThemeToggle />,
}));

const mockUseTheme = useTheme as jest.Mock;

describe('ThemeToggle', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render button with text and icon for light theme', () => {
    mockUseTheme.mockReturnValue({ theme: 'light', toggleTheme: jest.fn() });
    const { container } = render(<ActualThemeToggle />);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText(/Dark Mode/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Switch to dark mode/i)).toBeInTheDocument();
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('should render button with text and icon for dark theme', () => {
    mockUseTheme.mockReturnValue({ theme: 'dark', toggleTheme: jest.fn() });
    const { container } = render(<ActualThemeToggle />);
    expect(screen.getByText(/Light Mode/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Switch to light mode/i)).toBeInTheDocument();
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('should call toggleTheme when clicking the button', () => {
    const toggleTheme = jest.fn();
    mockUseTheme.mockReturnValue({ theme: 'light', toggleTheme });
    render(<ActualThemeToggle />);
    fireEvent.click(screen.getByRole('button'));
    expect(toggleTheme).toHaveBeenCalled();
  });
});
