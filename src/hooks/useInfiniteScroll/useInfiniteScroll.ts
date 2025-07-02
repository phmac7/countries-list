import { useOnScreen } from '@/hooks';
import { useCallback, useEffect, useState } from 'react';

export const useInfiniteScroll = <T>(
  totalItems: T[],
  itemsPerPage: number = 20
) => {
  const [page, setPage] = useState(1);
  const [displayedItems, setDisplayedItems] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const { measureRef, isIntersecting } = useOnScreen();

  useEffect(() => {
    setDisplayedItems(totalItems.slice(0, page * itemsPerPage));
    setHasMore(page * itemsPerPage < totalItems.length);
    setIsLoading(false);
  }, [page, itemsPerPage]);

  const loadMore = useCallback(() => {
    setIsLoading(true);
    setPage((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (isIntersecting && hasMore) {
      loadMore();
    }
  }, [isIntersecting, hasMore, loadMore]);

  return {
    displayedItems,
    hasMore,
    measureRef,
    isLoading,
  };
};
