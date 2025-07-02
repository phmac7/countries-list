import { renderHook, act } from '@testing-library/react';
import { useInfiniteScroll } from './useInfiniteScroll';
import { useOnScreen } from '@/hooks';

jest.mock('@/hooks', () => ({
  useOnScreen: jest.fn(),
}));

const mockedUseOnScreen = useOnScreen as jest.Mock;

describe('useInfiniteScroll', () => {
  const totalItems = Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`);
  const mockObserver = {
    observe: jest.fn(),
    unobserve: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockedUseOnScreen.mockReturnValue({
      measureRef: jest.fn(),
      isIntersecting: false,
      observer: mockObserver,
    });
  });

  it('should initialize with the first page of items and correct state', () => {
    const { result } = renderHook(() => useInfiniteScroll(totalItems, 10));

    expect(result.current.displayedItems).toHaveLength(10);
    expect(result.current.displayedItems).toEqual(totalItems.slice(0, 10));
    expect(result.current.hasMore).toBe(true);
    expect(result.current.isLoading).toBe(false);
  });

  it('should load the next page when element is intersecting', () => {
    const { result, rerender } = renderHook(() =>
      useInfiniteScroll(totalItems, 10)
    );

    mockedUseOnScreen.mockReturnValue({
      measureRef: jest.fn(),
      isIntersecting: true,
      observer: mockObserver,
    });

    act(() => {
      rerender();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.displayedItems).toHaveLength(20);
    expect(result.current.displayedItems).toEqual(totalItems.slice(0, 20));
    expect(result.current.hasMore).toBe(true);
  });

  it('should not load more items if hasMore is false', () => {
    const { result, rerender } = renderHook(() =>
      useInfiniteScroll(totalItems.slice(0, 5), 10)
    );

    expect(result.current.hasMore).toBe(false);

    mockedUseOnScreen.mockReturnValue({
      measureRef: jest.fn(),
      isIntersecting: true,
      observer: mockObserver,
    });

    act(() => {
      rerender();
    });

    expect(result.current.displayedItems).toHaveLength(5);
    expect(result.current.isLoading).toBe(false);
  });

  it('should set hasMore to false when all items are displayed', () => {
    const { result, rerender } = renderHook(() =>
      useInfiniteScroll(totalItems, 45)
    );

    expect(result.current.hasMore).toBe(true);

    mockedUseOnScreen.mockReturnValue({
      measureRef: jest.fn(),
      isIntersecting: true,
      observer: mockObserver,
    });

    act(() => {
      rerender();
    });

    expect(result.current.displayedItems).toHaveLength(50);
    expect(result.current.hasMore).toBe(false);
    expect(result.current.isLoading).toBe(false);
  });

  it('should use the default itemsPerPage value of 20', () => {
    const { result } = renderHook(() => useInfiniteScroll(totalItems));
    expect(result.current.displayedItems).toHaveLength(20);
  });

  it('should update displayedItems when totalItems array changes', () => {
    const initialProps = { items: totalItems.slice(0, 25), itemsPerPage: 10 };
    const { result, rerender } = renderHook(
      ({ items, itemsPerPage }) => useInfiniteScroll(items, itemsPerPage),
      { initialProps }
    );

    expect(result.current.displayedItems).toHaveLength(10);
    expect(result.current.hasMore).toBe(true);

    const newItems = totalItems.slice(0, 15);
    rerender({ items: newItems, itemsPerPage: 10 });

    expect(result.current.displayedItems).toHaveLength(10);
    expect(result.current.hasMore).toBe(true);
  });
});
