import { useCallback, useEffect, useRef } from 'react';

interface Props {
  update: () => Promise<void>;
  loading: boolean;
}

export const InfiniteScroll = ({ update, loading }: Props) => {
  const isScrollingRef = useRef(false);

  const handleScroll = useCallback(async () => {
    if (isScrollingRef.current) return;

    isScrollingRef.current = true;

    const diff = document.documentElement.offsetHeight - window.innerHeight - document.documentElement.scrollTop;

    const threshold = 0.8; // 80% of the page
    if (diff > window.innerHeight * threshold || loading) {
      isScrollingRef.current = false;
      return;
    }

    await update();

    isScrollingRef.current = false;
  }, [loading, update]);

  // Add the scroll event listener when the component mounts
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll, loading]);

  // If the loading state changes, we need to check if we need to load more data
  useEffect(() => {
    if (!loading) handleScroll();
  }, [handleScroll, loading]);

  return null;
};
