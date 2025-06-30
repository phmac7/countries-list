import { render, screen } from '@testing-library/react';
import { HomeTemplate } from './HomeTemplate';

describe('HomeTemplate', () => {
  it('renders without crashing', () => {
    render(<HomeTemplate />);
    expect(
      screen.getByPlaceholderText('Search for a country...')
    ).toBeInTheDocument();
  });
});
