import { renderHook, act } from '@testing-library/react';
import { useOnScreen } from './useOnScreen';

describe('useOnScreen', () => {
  let observerCallback: IntersectionObserverCallback | null = null;
  const mockObserve = jest.fn();
  const mockDisconnect = jest.fn();
  const mockUnobserve = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    observerCallback = null;

    window.IntersectionObserver = jest.fn((callback) => {
      observerCallback = callback;
      return {
        observe: mockObserve,
        disconnect: mockDisconnect,
        unobserve: mockUnobserve,
        takeRecords: jest.fn(),
        root: null,
        rootMargin: '',
        thresholds: [],
      };
    });
  });

  it('should initialize with isIntersecting as false', () => {
    const { result } = renderHook(() => useOnScreen());

    expect(result.current.isIntersecting).toBe(false);
    expect(typeof result.current.measureRef).toBe('function');
  });

  it('should create an observer when measureRef is called with a node', () => {
    const { result } = renderHook(() => useOnScreen());
    const mockElement = document.createElement('div');

    act(() => {
      result.current.measureRef(mockElement);
    });

    expect(window.IntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      {
        root: null,
        rootMargin: '0px',
        threshold: 0,
      }
    );
    expect(mockObserve).toHaveBeenCalledWith(mockElement);
  });

  it('should update isIntersecting when element becomes visible', () => {
    const { result } = renderHook(() => useOnScreen());
    const mockElement = document.createElement('div');

    act(() => {
      result.current.measureRef(mockElement);
    });

    act(() => {
      if (observerCallback) {
        observerCallback(
          [{ isIntersecting: true }] as IntersectionObserverEntry[],
          {} as IntersectionObserver
        );
      }
    });

    expect(result.current.isIntersecting).toBe(true);
  });

  it('should update isIntersecting when element becomes hidden', () => {
    const { result } = renderHook(() => useOnScreen());
    const mockElement = document.createElement('div');

    act(() => {
      result.current.measureRef(mockElement);
    });

    act(() => {
      if (observerCallback) {
        observerCallback(
          [{ isIntersecting: true }] as IntersectionObserverEntry[],
          {} as IntersectionObserver
        );
      }
    });

    expect(result.current.isIntersecting).toBe(true);

    act(() => {
      if (observerCallback) {
        observerCallback(
          [{ isIntersecting: false }] as IntersectionObserverEntry[],
          {} as IntersectionObserver
        );
      }
    });

    expect(result.current.isIntersecting).toBe(false);
  });

  it('should not create observer when measureRef is called with null', () => {
    const { result } = renderHook(() => useOnScreen());

    act(() => {
      result.current.measureRef(null);
    });

    expect(window.IntersectionObserver).not.toHaveBeenCalled();
  });

  it('should use custom options when provided', () => {
    const customOptions = {
      root: null,
      rootMargin: '10px',
      threshold: 0.5,
    };

    const { result } = renderHook(() => useOnScreen(customOptions));
    const mockElement = document.createElement('div');

    act(() => {
      result.current.measureRef(mockElement);
    });

    expect(window.IntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      customOptions
    );
  });

  it('should handle multiple measureRef calls correctly', () => {
    const { result } = renderHook(() => useOnScreen());
    const mockElement1 = document.createElement('div');
    const mockElement2 = document.createElement('div');

    act(() => {
      result.current.measureRef(mockElement1);
    });

    expect(mockObserve).toHaveBeenCalledWith(mockElement1);

    act(() => {
      result.current.measureRef(mockElement2);
    });

    expect(mockObserve).toHaveBeenCalledWith(mockElement2);
  });

  it('should handle empty options object', () => {
    const { result } = renderHook(() => useOnScreen({}));
    const mockElement = document.createElement('div');

    act(() => {
      result.current.measureRef(mockElement);
    });

    expect(window.IntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      {
        root: null,
        rootMargin: '0px',
        threshold: 0,
      }
    );
  });

  it('should maintain observer reference across re-renders', () => {
    const { result, rerender } = renderHook(() => useOnScreen());
    const mockElement = document.createElement('div');

    act(() => {
      result.current.measureRef(mockElement);
    });

    rerender();

    const firstObserver = result.current.observer;

    rerender();

    const secondObserver = result.current.observer;

    expect(secondObserver).toBe(firstObserver);
    expect(firstObserver).not.toBeNull();
  });
});
