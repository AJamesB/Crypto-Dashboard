export type CoinMarket = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
};

export type CoinDetails = {
  id: string;
  symbol: string;
  name: string;
  image?: {
    large: string;
  };
  market_cap_rank: number;
  description?: {
    en: string;
  };
  market_data?: {
    current_price?: { usd: number };
    market_cap?: { usd: number };
    total_volume?: { usd: number };
    price_change_percentage_24h: number;
    circulating_supply: number;
    high_24h?: { usd: number };
    low_24h?: { usd: number };
    ath?: { usd: number };
    atl?: { usd: number };
  };
  links?: {
    homepage?: string[];
    blockchain_site?: string[];
  };
};

const BASE = "https://api.coingecko.com/api/v3";

export async function fetchTopMarketCoins(
  perPage = 10,
  vsCurrency = "usd",
  page = 1,
  apiKey?: string
): Promise<CoinMarket[]> {
  const url = `${BASE}/coins/markets?vs_currency=${encodeURIComponent(
    vsCurrency
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

export async function fetchCoinDetails(
  coinId: string,
  apiKey?: string
): Promise<CoinDetails> {
  const url = `${BASE}/coins/${coinId}?localization=false&tickers=false&community_data=false&developer_data=false`;

  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  if (apiKey) {
    headers["Authorization"] = `Bearer ${apiKey}`;
  }

  const resp = await fetch(url, { headers });
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Failed to fetch coin details: ${resp.status} - ${text}`);
  }

  const data = (await resp.json()) as CoinDetails;
  return data;
}
