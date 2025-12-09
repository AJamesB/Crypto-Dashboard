import TopCoinsList from "./components/TopCoinsList";
import { Header } from "./components/Header";
import { Container } from "./components/Container";
import { Card } from "./components/Card";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header>
        <h1 className="text-xl font-semibold">Crypto Dashboard</h1>
      </Header>

      <main>
        <Container className="py-8">
          <Card>
            <TopCoinsList />
          </Card>
        </Container>
      </main>
    </div>
  );
}
