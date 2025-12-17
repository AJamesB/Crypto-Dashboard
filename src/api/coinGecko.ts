import currencyCodes from "currency-codes";
import getSymbolFromCurrency from "currency-symbol-map";
import type {
  CoinMarket,
  CoinDetails,
  CurrencyInfo,
  HistoricalChartData,
} from "../types";

const BASE = "https://api.coingecko.com/api/v3";

/**
 * fetchTopMarketCoins - Fetch top market coins by market cap
 *
 * @param perPage - Number of coins per page
 * @param vsCurrency - The target currency
 * @param page - The page number
 * @param apiKey - Optional CoinGecko API key
 * @returns Top market coins
 */
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

/**
 * fetchCoinDetails - Fetch detailed information for a specific coin
 *
 * @param coinId - The coin ID (e.g., "bitcoin")
 * @param vsCurrency - The target currency (e.g., "zar")
 * @param apiKey - Optional CoinGecko API key
 * @returns Coin details
 */
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

/**
 * fetchSupportedCurrencies - Fetch supported vs currencies from CoinGecko
 *
 * @param apiKey - Optional CoinGecko API key
 * @returns Map of currency codes to CurrencyInfo
 */
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

  // Transform currency codes into detailed info objects with symbols and names
  const currencyMap: Record<string, CurrencyInfo> = {};
  currencies.forEach((code) => {
    const upperCode = code.toUpperCase();

    // Get currency symbol (e.g., R for ZAR)
    const symbol = getSymbolFromCurrency(upperCode) || "";

    // Get full currency name from currency-codes library
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

/**
 * fetchCoinMarketChart - Fetch historical market chart data for a coin
 *
 * @param coinId - The coin ID
 * @param vsCurrency - The target currency
 * @param days - Number of days of data
 * @param apiKey - Optional CoinGecko API key
 * @returns Historical price, market cap, and volume data
 */
export async function fetchCoinMarketChart(
  coinId: string,
  vsCurrency: string = "usd",
  days: number | "max" = 1,
  apiKey?: string
): Promise<HistoricalChartData> {
  const url = `${BASE}/coins/${coinId}/market_chart?vs_currency=${encodeURIComponent(
    vsCurrency
  )}&days=${days}`;

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
      `Failed to fetch market chart data: ${resp.status} - ${text}`
    );
  }

  const data = (await resp.json()) as HistoricalChartData;
  return data;
}
