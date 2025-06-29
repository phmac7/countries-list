import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, useTheme } from '@/contexts';

jest.mock('@/lib/theme/theme', () => ({
  getThemeFromClient: jest.fn(),
  setThemeCookie: jest.fn(),
}));
import { getThemeFromClient, setThemeCookie } from '@/lib/theme/theme';

const mockGetThemeFromClient = jest.mocked(getThemeFromClient);
const mockSetThemeCookie = jest.mocked(setThemeCookie);

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

Object.defineProperty(document, 'documentElement', {
  value: {
    classList: {
      add: jest.fn(),
      remove: jest.fn(),
    },
    setAttribute: jest.fn(),
    getAttribute: jest.fn(),
  },
  writable: true,
});

const TestComponent = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggleTheme} data-testid="toggle">
        Toggle Theme
      </button>
    </div>
  );
};

describe('ThemeContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetThemeFromClient.mockReturnValue('light');
    localStorageMock.getItem.mockReturnValue(null);
    localStorageMock.setItem.mockImplementation(() => {});
  });

  describe('ThemeProvider', () => {
    it('should render children with theme context', () => {
      render(
        <ThemeProvider initialTheme="light">
          <TestComponent />
        </ThemeProvider>
      );

      expect(screen.getByTestId('theme')).toHaveTextContent('light');
      expect(screen.getByTestId('toggle')).toBeInTheDocument();
    });

    it('should initialize with provided theme', () => {
      render(
        <ThemeProvider initialTheme="dark">
          <TestComponent />
        </ThemeProvider>
      );

      expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    });

    it('should initialize with theme from client when no initial theme provided', () => {
      mockGetThemeFromClient.mockReturnValue('dark');

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    });

    it('should apply theme class to document element', () => {
      render(
        <ThemeProvider initialTheme="dark">
          <TestComponent />
        </ThemeProvider>
      );

      expect(document.documentElement.setAttribute).toHaveBeenCalledWith(
        'data-theme',
        'dark'
      );
    });

    it('should remove previous theme class when theme changes', () => {
      const { rerender } = render(
        <ThemeProvider initialTheme="light" key="light">
          <TestComponent />
        </ThemeProvider>
      );

      expect(document.documentElement.setAttribute).toHaveBeenCalledWith(
        'data-theme',
        'light'
      );

      rerender(
        <ThemeProvider initialTheme="dark" key="dark">
          <TestComponent />
        </ThemeProvider>
      );

      expect(document.documentElement.setAttribute).toHaveBeenCalledWith(
        'data-theme',
        'dark'
      );
    });
  });

  describe('useTheme hook', () => {
    it('should throw error when used outside ThemeProvider', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      expect(() => {
        render(<TestComponent />);
      }).toThrow('useTheme must be used within a ThemeProvider');

      consoleSpy.mockRestore();
    });

    it('should toggle theme from light to dark', () => {
      render(
        <ThemeProvider initialTheme="light">
          <TestComponent />
        </ThemeProvider>
      );

      expect(screen.getByTestId('theme')).toHaveTextContent('light');

      fireEvent.click(screen.getByTestId('toggle'));

      expect(screen.getByTestId('theme')).toHaveTextContent('dark');
      expect(mockSetThemeCookie).toHaveBeenCalledWith('dark');
      expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark');
    });

    it('should toggle theme from dark to light', () => {
      render(
        <ThemeProvider initialTheme="dark">
          <TestComponent />
        </ThemeProvider>
      );

      expect(screen.getByTestId('theme')).toHaveTextContent('dark');

      fireEvent.click(screen.getByTestId('toggle'));

      expect(screen.getByTestId('theme')).toHaveTextContent('light');
      expect(mockSetThemeCookie).toHaveBeenCalledWith('light');
      expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'light');
    });

    it('should handle multiple theme toggles', () => {
      render(
        <ThemeProvider initialTheme="light">
          <TestComponent />
        </ThemeProvider>
      );

      expect(screen.getByTestId('theme')).toHaveTextContent('light');

      fireEvent.click(screen.getByTestId('toggle'));
      expect(screen.getByTestId('theme')).toHaveTextContent('dark');

      fireEvent.click(screen.getByTestId('toggle'));
      expect(screen.getByTestId('theme')).toHaveTextContent('light');

      fireEvent.click(screen.getByTestId('toggle'));
      expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    });

    it('should update document element classes on theme toggle', () => {
      render(
        <ThemeProvider initialTheme="light">
          <TestComponent />
        </ThemeProvider>
      );

      fireEvent.click(screen.getByTestId('toggle'));

      expect(document.documentElement.setAttribute).toHaveBeenCalledWith(
        'data-theme',
        'dark'
      );
    });
  });
});
