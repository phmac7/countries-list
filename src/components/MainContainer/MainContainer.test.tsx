import React from 'react';
import { render, screen } from '@testing-library/react';
import { MainContainer } from '@/components';

describe('MainContainer', () => {
  it('should render children correctly', () => {
    const testContent = 'Test Content';
    render(
      <MainContainer>
        <div data-testid="test-child">{testContent}</div>
      </MainContainer>
    );

    const child = screen.getByTestId('test-child');
    expect(child).toBeInTheDocument();
    expect(child).toHaveTextContent(testContent);
  });

  it('should apply correct CSS classes', () => {
    render(
      <MainContainer>
        <div>Content</div>
      </MainContainer>
    );

    const mainElement = screen.getByRole('main');
    expect(mainElement).toHaveClass('mainContainer');

    const contentDiv = mainElement.firstElementChild;
    expect(contentDiv).toHaveClass('mainContainer__content');
  });
});
