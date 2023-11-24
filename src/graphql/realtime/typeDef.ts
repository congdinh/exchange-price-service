import gql from 'graphql-tag';

export default gql`
  extend type Query {
    """
    Query 24hr Ticker Price Change Statistics
    """
    getPriceTickerData(symbol: String): [PriceTickerDataPayload]

    """
    Query future kline data
    """
    getFutureKlineData(symbol: String!): [BinanceKlineDataPayload]
  }

  extend type Subscription {
    """
    Notify Time data
    """
    notifyTimeData: JSON

    """
    Notify price ticker data
    """
    notifyPriceTickerData(symbol: String): PriceTickerData

    """
    Notify price ticker data by list symbols
    """
    notifyPriceTickerDataByList(symbols: [String]): PriceTickerData

    """
    Notify kline data by list symbols
    """
    notifyKlineDataByList(symbols: [String]): KlineStreamDataPayload
  }

  type KlineStreamDataPayload {
    data: KlineStreamData
  }

  type KlineStreamData {
    """
    Event type
    """
    e: String
    """
    Event time
    """
    E: Date
    """
    Symbol
    """
    s: String
    """
    Kline data
    """
    k: BinanceKlineDataPayload
  }

  type PriceTickerDataPayload {
    # "symbol": "BTCUSDT",
    # "priceChange": "-94.99999800",
    # "priceChangePercent": "-95.960",
    # "weightedAvgPrice": "0.29628482",
    # "lastPrice": "4.00000200",
    # "lastQty": "200.00000000",
    # "openPrice": "99.00000000",
    # "highPrice": "100.00000000",
    # "lowPrice": "0.10000000",
    # "volume": "8913.30000000",
    # "quoteVolume": "15.30000000",
    # "openTime": 1499783499040,
    # "closeTime": 1499869899040,
    # "firstId": 28385,   // First tradeId
    # "lastId": 28460,    // Last tradeId
    # "count": 76         // Trade count
    """
    Symbol
    """
    symbol: String
    """
    Price change
    """
    priceChange: String
    """
    Price change percent
    """
    priceChangePercent: String
    """
    Weighted average price
    """
    weightedAvgPrice: String
    """
    Last price
    """
    lastPrice: String
    """
    Last quantity
    """
    lastQty: String
    """
    Open price
    """
    openPrice: String
    """
    High price
    """
    highPrice: String
    """
    Low price
    """
    lowPrice: String
    """
    Total traded base asset volume
    """
    volume: String
    """
    Total traded quote asset volume
    """
    quoteVolume: String
    """
    Statistics open time
    """
    openTime: Float
    """
    Statistics close time
    """
    closeTime: Float
    """
    First trade ID
    """
    firstId: Float
    """
    Last trade Id
    """
    lastId: Float
    """
    Total number of trades
    """
    count: Float
  }

  type BinanceKlineDataPayload {
    """
    Open time
    """
    t: Date
    """
    Open
    """
    o: String
    """
    High
    """
    h: String
    """
    Low
    """
    l: String
    """
    Close
    """
    c: String
    """
    Volume
    """
    v: String
    """
    Close time
    """
    T: Date
    """
    Quote asset volume
    """
    q: String
    """
    Number of trades
    """
    n: Float
    """
    Taker buy base asset volume
    """
    V: String
    """
    Taker buy quote asset volume
    """
    Q: String
    """
    Ignore
    """
    B: String
  }

  type PriceTickerData {
    data: SymbolTickerStreamPayload
  }

  type SymbolTickerStreamPayload {
    """
    Event time
    """
    E: Date
    """
    Event type
    """
    e: String
    """
    Symbol
    """
    s: String
    """
    Price change
    """
    p: String
    """
    Price change percent
    """
    P: String
    """
    Weighted average price
    """
    w: String
    """
    First trade(F)-1 price (first trade before the 24hr rolling window)
    """
    x: String
    """
    Last price
    """
    c: String
    """
    Last quantity
    """
    Q: String
    """
    Best bid price
    """
    b: String
    """
    Best bid quantity
    """
    B: String
    """
    Best ask price
    """
    a: String
    """
    Best ask quantity
    """
    A: String
    """
    Open price
    """
    o: String
    """
    High price
    """
    h: String
    """
    Low price
    """
    l: String
    """
    Total traded base asset volume
    """
    v: String
    """
    Total traded quote asset volume
    """
    q: String
    """
    Statistics open time
    """
    O: Float
    """
    Statistics close time
    """
    C: Float
    """
    First trade ID
    """
    F: Float
    """
    Last trade Id
    """
    L: Float
    """
    Total number of trades
    """
    n: Float
  }
`;
