import { useParams, Link } from "react-router-dom";
import { useCoinDetails } from "../hooks/useCoinDetails";
import {
  CoinDetails,
  Container,
  Card,
  LoadingState,
  ErrorMessage,
} from "../components";

/**
 * CoinDetailPage - Page component to display detailed information about a specific coin
 */
export default function CoinDetailPage() {
  const { coinId } = useParams<{ coinId: string }>();
  const { data, isLoading, error, isFetching } = useCoinDetails(coinId);

  if (isLoading) {
    return (
      <Container className="py-8">
        <LoadingState message="Loading coin details..." />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-8">
        <Card>
          <ErrorMessage message={error.message} />
          <Link
            to="/"
            className="mt-4 inline-block text-blue-600 hover:underline"
          >
            ← Back to list
          </Link>
        </Card>
      </Container>
    );
  }

  if (!data) return null;

  return (
    <Container className="py-8">
      <div className="mb-4">
        <Link
          to="/"
          className="text-blue-600 hover:underline inline-flex items-center gap-1"
        >
          &larr; Back to list
        </Link>
      </div>

      <Card>
        <CoinDetails coin={data} isFetching={isFetching} />
      </Card>
    </Container>
  );
}
