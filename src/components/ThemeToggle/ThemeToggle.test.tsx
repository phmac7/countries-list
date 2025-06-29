import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeToggle } from './ThemeToggle';
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext/ThemeContext';

jest.mock('@/contexts/ThemeContext', () => ({
  useTheme: jest.fn(),
}));

const mockUseTheme = useTheme as jest.Mock;

describe('ThemeToggle', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar o botão com texto e ícone para tema light', () => {
    mockUseTheme.mockReturnValue({ theme: 'light', toggleTheme: jest.fn() });
    const { container } = render(<ThemeToggle />);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText(/Dark Mode/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Switch to dark mode/i)).toBeInTheDocument();
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('deve renderizar o botão com texto e ícone para tema dark', () => {
    mockUseTheme.mockReturnValue({ theme: 'dark', toggleTheme: jest.fn() });
    const { container } = render(<ThemeToggle />);
    expect(screen.getByText(/Light Mode/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Switch to light mode/i)).toBeInTheDocument();
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('deve chamar toggleTheme ao clicar no botão', () => {
    const toggleTheme = jest.fn();
    mockUseTheme.mockReturnValue({ theme: 'light', toggleTheme });
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole('button'));
    expect(toggleTheme).toHaveBeenCalled();
  });
});
