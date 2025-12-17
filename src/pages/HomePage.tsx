import { useEffect, useRef, useCallback } from "react";
import {
  TopCoinsList,
  Container,
  Card,
  LoadingState,
  ErrorMessage,
  Spinner,
} from "../components";
import { useInfiniteTopCoins } from "../hooks/useInfiniteTopCoins";

/**
 * HomePage - Page component to display the top cryptocurrencies with infinite scrolling
 */
export default function HomePage() {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteTopCoins({
    perPage: 100,
  });

  const sentinelRef = useRef<HTMLDivElement>(null);

  /**
   * Handle intersection observer callback for infinite scroll
   * Triggers fetchNextPage when the sentinel element becomes visible
   */
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  /**
   * Set up intersection observer for infinite scroll
   * Observes sentinel element at bottom of list with 100px pre-fetch margin
   */
  useEffect(() => {
    const element = sentinelRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "100px", // Start loading 100px before reaching the sentinel
      threshold: 0.1,
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, [handleObserver]);

  // Flatten all pages into a single array of coins
  const coins = data?.pages.flatMap((page) => page) ?? [];

  return (
    <main>
      <Container className="py-8">
        <Card>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-700 pb-4">
              Top Cryptocurrencies
            </h2>

            {/* Error State */}
            {error && (
              <ErrorMessage message={error.message} onRetry={() => refetch()} />
            )}

            {/* Coins List */}
            {!error && coins.length > 0 && <TopCoinsList coins={coins} />}

            {/* Loading State (initial load) */}
            {isLoading && coins.length === 0 && (
              <div className="min-h-[400px] flex items-center justify-center">
                <LoadingState message="Loading top coins…" />
              </div>
            )}

            {/* Infinite Scroll Sentinel */}
            {!error && coins.length > 0 && (
              <div ref={sentinelRef} className="py-4 flex justify-center">
                {isFetchingNextPage && (
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <Spinner size={20} />
                    <span>Loading more coins...</span>
                  </div>
                )}
                {!hasNextPage && (
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    No more coins to load
                  </p>
                )}
              </div>
            )}
          </div>
        </Card>
      </Container>
    </main>
  );
}
