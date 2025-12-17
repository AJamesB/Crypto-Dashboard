import currencyCodes from "currency-codes";
import getSymbolFromCurrency from "currency-symbol-map";
import type { CoinMarket, CoinDetails, CurrencyInfo } from "../types";

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
