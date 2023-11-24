export interface ISymbolTickerStreamPayload {
  E: number; // 123456789; // Event time
  e: string; // '24hrTicker'; // Event type
  s: string; // 'BNBBTC'; // Symbol
  p: string; // '0.0015'; // Price change
  P: string; // '250.00'; // Price change percent
  w: string; // '0.0018'; // Weighted average price
  x: string; // '0.0009'; // First trade(F)-1 price (first trade before the 24hr rolling window)
  c: string; // '0.0025'; // Last price
  Q: string; // '10'; // Last quantity
  b: string; // '0.0024'; // Best bid price
  B: string; // '10'; // Best bid quantity
  a: string; // '0.0026'; // Best ask price
  A: string; // '100'; // Best ask quantity
  o: string; // '0.0010'; // Open price
  h: string; //  '0.0025'; // High price
  l: string; //'0.0010'; // Low price
  v: string; // '10000'; // Total traded base asset volume
  q: string; // '18'; // Total traded quote asset volume
  O: number; // 0; // Statistics open time
  C: number; // 86400000; // Statistics close time
  F: number; // 0; // First trade ID
  L: number; // 18150; // Last trade Id
  n: number; // 18151; // Total number of trades
}

export interface ISymbolKlineDataPayload {
  // 1499040000000,      // Open time
  // "0.01634790",       // Open
  // "0.80000000",       // High
  // "0.01575800",       // Low
  // "0.01577100",       // Close
  // "148976.11427815",  // Volume
  // 1499644799999,      // Close time
  // "2434.19055334",    // Quote asset volume
  // 308,                // Number of trades
  // "1756.87402397",    // Taker buy base asset volume
  // "28.46694368",      // Taker buy quote asset volume
  // "17928899.62484339" // Ignore.
  t: number; // 1499040000000,      // Open time
  o: string; // "0.01634790",       // Open
  h: string; // "0.80000000",       // High
  l: string; // "0.01575800",       // Low
  c: string; // "0.01577100",       // Close
  v: string; // "148976.11427815",  // Volume
  T: number; // 1499644799999,      // Close time
  q: string; // "2434.19055334",    // Quote asset volume
  n: number; // 308,                // Number of trades
  V: string; // "1756.87402397",    // Taker buy base asset volume
  Q: string; // "28.46694368",      // Taker buy quote asset volume
  B: string; // "17928899.62484339" // Ignore.
}

export interface IPriceTickerDataPayload {
  // "symbol": "BTCUSDT",
  // "priceChange": "-94.99999800",
  // "priceChangePercent": "-95.960",
  // "weightedAvgPrice": "0.29628482",
  // "lastPrice": "4.00000200",
  // "lastQty": "200.00000000",
  // "openPrice": "99.00000000",
  // "highPrice": "100.00000000",
  // "lowPrice": "0.10000000",
  // "volume": "8913.30000000",
  // "quoteVolume": "15.30000000",
  // "openTime": 1499783499040,
  // "closeTime": 1499869899040,
  // "firstId": 28385,   // First tradeId
  // "lastId": 28460,    // Last tradeId
  // "count": 76         // Trade count
  symbol: string;
  priceChange: string;
  priceChangePercent: string;
  weightedAvgPrice: string;
  lastPrice: string;
  lastQty: string;
  openPrice: string;
  highPrice: string;
  lowPrice: string;
  volume: string;
  quoteVolume: string;
  openTime: number;
  closeTime: number;
  firstId: number;
  lastId: number;
  count: number;
}

export interface IBinanceExchangeInfoPayload {
  timezone: string;
  serverTime: string;
  exchangeFilters: string[];
  symbols: IBinanceSymbol[];
}

export interface IBinanceSymbol {
  symbol: string;
  status: string;
  baseAsset: string;
  baseAssetPrecision: number;
  quoteAsset: string;
  quotePrecision: number;
  quoteAssetPrecision: number;
  baseCommissionPrecision: number;
  quoteCommissionPrecision: number;
  orderTypes: string[];
  icebergAllowed: boolean;
  ocoAllowed: boolean;
  quoteOrderQtyMarketAllowed: boolean;
  isSpotTradingAllowed: boolean;
  isMarginTradingAllowed: boolean;
  filters: IBinanceSymbolFilter[];
  permissions: string[];
}

export interface IBinanceSymbolFilter {
  filterType: string;
  minPrice: string;
  maxPrice: string;
  tickSize: string;
  multiplierUp: string;
  multiplierDown: string;
  avgPriceMins: number;
  minQty: string;
  maxQty: string;
  stepSize: string;
  minNotional: string;
  applyToMarket: boolean;
  limit: number;
  maxNumAlgoOrders: number;
}
