import React from 'react';
import { render, screen } from '@testing-library/react';
import { Navbar as ActualNavbar } from '../Navbar';

jest.mock('@/components', () => ({
  ThemeToggle: () => <div data-testid="theme-toggle-mock">Theme Toggle</div>,
  Navbar: () => <ActualNavbar />,
}));

describe('Navbar', () => {
  it('should render the title correctly', () => {
    render(<ActualNavbar />);

    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Where in the world?');
  });

  it('should render the ThemeToggle component', () => {
    render(<ActualNavbar />);

    const themeToggle = screen.getByTestId('theme-toggle-mock');
    expect(themeToggle).toBeInTheDocument();
  });

  it('should apply correct CSS classes', () => {
    render(<ActualNavbar />);

    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('navbar');

    const container = nav.firstElementChild;
    expect(container).toHaveClass('navbar__container');

    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toHaveClass('navbar__title');
  });
});
