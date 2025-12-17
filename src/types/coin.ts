/**
 * CoinMarket - Summary info for a coin in market listings
 */
export type CoinMarket = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
};

/**
 * CoinDetails - Detailed info for a single coin
 */
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
    total_supply?: number;
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

/**
 * HistoricalChartData - Historical market data from CoinGecko API
 */
export type HistoricalChartData = {
  prices: [number, number][]; // [timestamp, price]
  market_caps: [number, number][]; // [timestamp, market_cap]
  total_volumes: [number, number][]; // [timestamp, volume]
};

/**
 * ChartDataPoint - Formatted data point for charting
 */
export type ChartDataPoint = {
  timestamp: number;
  date: string;
  value: number;
};
