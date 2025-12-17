import currencyCodes from "currency-codes";
import getSymbolFromCurrency from "currency-symbol-map";

export type CurrencyInfo = {
  code: string;
  symbol: string;
  name: string;
};

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
    current_price?: Record<string, number>;
    market_cap?: Record<string, number>;
    total_volume?: Record<string, number>;
    price_change_percentage_24h: number;
    circulating_supply: number;
    high_24h?: Record<string, number>;
    low_24h?: Record<string, number>;
    ath?: Record<string, number>;
    atl?: Record<string, number>;
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
  vsCurrency: string = "zar",
  apiKey?: string
): Promise<CoinDetails> {
  const url = `${BASE}/coins/${coinId}?localization=false&tickers=false&community_data=false&developer_data=false&vs_currency=${encodeURIComponent(
    vsCurrency
  )}`;

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

export async function fetchSupportedCurrencies(
  apiKey?: string
): Promise<Record<string, CurrencyInfo>> {
  const url = `${BASE}/simple/supported_vs_currencies`;

  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  if (apiKey) {
    headers["Authorization"] = `Bearer ${apiKey}`;
  }

  const resp = await fetch(url, { headers });
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(
      `Failed to fetch supported currencies: ${resp.status} - ${text}`
    );
  }

  const currencies: string[] = await resp.json();

  const currencyMap: Record<string, CurrencyInfo> = {};
  currencies.forEach((code) => {
    const upperCode = code.toUpperCase();

    const symbol = getSymbolFromCurrency(upperCode) || "";

    const currencyData = currencyCodes.code(upperCode);
    const name = currencyData?.currency || "";

    currencyMap[upperCode] = {
      code: code,
      symbol: symbol,
      name: name,
    };
  });

  return currencyMap;
}
