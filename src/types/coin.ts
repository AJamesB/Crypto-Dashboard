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
