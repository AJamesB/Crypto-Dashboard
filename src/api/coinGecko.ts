export type CoinMarket = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
};

const BASE = "https://api.coingecko.com/api/v3";

export async function fetchTopMarketCoins(
  perPage = 10,
  vsCurrency = "usd",
  page = 1,
  apiKey?: string,
): Promise<CoinMarket[]> {
  const url = `${BASE}/coins/markets?vs_currency=${encodeURIComponent(
    vsCurrency,
  )}&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=false`;

  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  if (apiKey) {
    headers["Authorization"] = `Bearer ${apiKey}`;
  }

  const resp = await fetch(url, { headers });
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`CoinGecko fetch error ${resp.status}: ${text}`);
  }
  const data = (await resp.json()) as CoinMarket[];
  return data;
}
