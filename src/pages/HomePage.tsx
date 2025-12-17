import {
  TopCoinsList,
  Container,
  Card,
  LoadingState,
  ErrorMessage,
} from "../components";
import { useTopCoins } from "../hooks/useTopCoins";

/**
 * HomePage - Page component to display the top cryptocurrencies
 */
export default function HomePage() {
  const { data, isLoading, error, isFetching, refetch } = useTopCoins({
    perPage: 100,
  });

  if (isLoading) {
    return (
      <main>
        <Container className="py-8">
          <Card>
            <LoadingState message="Loading top coins…" />
          </Card>
        </Container>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <Container className="py-8">
          <Card>
            <ErrorMessage message={error.message} onRetry={() => refetch()} />
          </Card>
        </Container>
      </main>
    );
  }

  if (!data) return null;

  return (
    <main>
      <Container className="py-8">
        <Card>
          <TopCoinsList coins={data} isFetching={isFetching} />
        </Card>
      </Container>
    </main>
  );
}
