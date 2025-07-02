import { useCallback, useRef, useState } from 'react';

export const useOnScreen = ({
  root = null,
  rootMargin = '0px',
  threshold = 0,
} = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const measureRef = useCallback(
    (node: Element | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      if (node) {
        observerRef.current = new IntersectionObserver(
          ([entry]) => {
            setIsIntersecting(entry.isIntersecting);
          },
          { root, rootMargin, threshold }
        );

        observerRef.current.observe(node);
      }
    },
    [root, rootMargin, threshold]
  );

  return { measureRef, isIntersecting, observer: observerRef.current };
};
