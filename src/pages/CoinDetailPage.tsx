import { useParams, Link } from "react-router-dom";
import { useCoinDetails } from "../hooks/useCoinDetails";
import { CoinDetails } from "../components/CoinDetails";
import { Container } from "../components/Container";
import { Card } from "../components/Card";

export default function CoinDetailPage() {
  const { coinId } = useParams<{ coinId: string }>();
  const { data, isLoading, error } = useCoinDetails(coinId);

  if (isLoading) {
    return (
      <Container className="py-8">
        <div className="text-center py-12 text-slate-600">
          Loading coin details...
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-8">
        <Card>
          <div className="text-center py-8 text-red-600 bg-red-50 rounded-md p-4">
            Error: {error.message}
          </div>
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
        <CoinDetails coin={data} />
      </Card>
    </Container>
  );
}
