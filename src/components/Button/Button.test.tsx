import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('should render button with label', () => {
    render(<Button label="Click me" />);

    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should render button with icon', () => {
    render(<Button label="Home" icon="FaHome" />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button.querySelector('svg')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('should render as link when href is provided', () => {
    render(<Button label="Go to Home" href="/home" />);

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/home');
    expect(screen.getByText('Go to Home')).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button label="Click me" onClick={handleClick} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should render with correct styles', () => {
    render(<Button label="Styled Button" />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('button');
  });

  it('should render link with icon and correct styles', () => {
    render(<Button label="Home Link" href="/home" icon="FaHome" />);

    const link = screen.getByRole('link');
    expect(link).toHaveClass('button');
    expect(link.querySelector('svg')).toBeInTheDocument();
    expect(screen.getByText('Home Link')).toBeInTheDocument();
  });
});
