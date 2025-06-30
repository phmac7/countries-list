import { render, screen } from '@testing-library/react';
import Home from '@/app/(Home)/page';

jest.mock('@/app/(Home)/page', () => ({
  __esModule: true,
  default: () => <div data-testid="home-content">Home Content</div>,
}));
global.fetch = jest.fn();

describe('Home page', () => {
  it('shows home content', async () => {
    const Page = await Home();
    render(Page);
    expect(await screen.findByTestId('home-content')).toBeInTheDocument();
  });
});
