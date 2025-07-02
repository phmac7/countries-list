import { useCallback, useState } from 'react';

export const useOnScreen = ({
  root = null,
  rootMargin = '0px',
  threshold = 0,
} = {}) => {
  const [observer, setObserver] = useState<IntersectionObserver | undefined>();
  const [isIntersecting, setIsIntersecting] = useState(false);

  const measureRef = useCallback(
    (node: Element | null) => {
      if (node) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            setIsIntersecting(entry.isIntersecting);
          },
          { root, rootMargin, threshold }
        );

        observer.observe(node);
        setObserver(observer);
      }
    },
    [root, rootMargin, threshold]
  );

  return { measureRef, isIntersecting, observer };
};
