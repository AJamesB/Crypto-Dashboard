import TopCoinsList from "../components/TopCoinsList";
import { Container } from "../components/Container";
import { Card } from "../components/Card";

export default function HomePage() {
  return (
    <main>
      <Container className="py-8">
        <Card>
          <TopCoinsList />
        </Card>
      </Container>
    </main>
  );
}
