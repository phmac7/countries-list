import { render, screen } from '@testing-library/react';
import { GridContainer } from './GridContainer';

describe('GridContainer', () => {
  it('renders empty container when array is empty', () => {
    render(<GridContainer array={[]} renderItem={() => <div>Item</div>} />);
    const items = screen.queryAllByText(/Item/);
    expect(items).toHaveLength(0);
  });

  it('renders correct number of items', () => {
    const testArray = ['a', 'b', 'c'];
    render(
      <GridContainer
        array={testArray}
        renderItem={(item) => <div>{item}</div>}
      />
    );

    expect(screen.getByText('a')).toBeInTheDocument();
    expect(screen.getByText('b')).toBeInTheDocument();
    expect(screen.getByText('c')).toBeInTheDocument();
  });

  it('renders complex content correctly', () => {
    const testArray = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
    ];

    render(
      <GridContainer
        array={testArray}
        renderItem={(item) => (
          <div>
            <h3>{item.name}</h3>
            <p>ID: {item.id}</p>
          </div>
        )}
      />
    );

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('ID: 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('ID: 2')).toBeInTheDocument();
  });
});
