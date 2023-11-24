import gql from 'graphql-tag';

export default gql`
  extend type Query {
    """
    Query binance exchange data
    """
    binanceExchangeInfo: BinanceExchangeInfoPayload

    """
    Query binance funding info
    """
    binanceFundingInfo: [BinanceFundingInfoPayload]

    """
    Query binance tradingview config
    """
    binanceTradingViewConfig: BinanceTradingViewConfigPayload
  }

  type BinanceTradingViewConfigPayload {
    # exchange: string
    # base_api_url: string
    # stream_host: string
    # symbol_info_url: string
    """
    Exchange
    """
    exchange: String
    """
    Base api url
    """
    base_api_url: String
    """
    Stream host
    """
    stream_host: String
    """
    Symbol info url
    """
    symbol_info_url: String
  }

  type BinanceFundingInfoPayload {
    # symbol: String
    # pair: String
    # markPrice: Float
    # indexPrice: Float
    # estimatedSettlePrice: Float
    # lastFundingRate: Float
    # interestRate: Float
    # nextFundingTime: String
    # time: String
    """
    Symbol
    """
    symbol: String
    """
    Pair
    """
    pair: String
    """
    Mark price
    """
    markPrice: Float
    """
    Index price
    """
    indexPrice: Float
    """
    Estimated settle price
    """
    estimatedSettlePrice: Float
    """
    Last funding rate
    """
    lastFundingRate: Float
    """
    Interest rate
    """
    interestRate: Float
    """
    Next funding time
    """
    nextFundingTime: String
    """
    Time
    """
    time: String
  }

  type BinanceExchangeInfoPayload {
    # timezone: String
    # serverTime: String
    # exchangeFilters: [String]
    # symbols: [BinanceSymbol]
    """
    Timezone
    """
    timezone: String
    """
    Server time
    """
    serverTime: String
    """
    Exchange filters
    """
    exchangeFilters: [String]
    """
    Symbols
    """
    symbols: [BinanceSymbol]
  }

  type BinanceSymbol {
    # symbol: String
    # status: String
    # baseAsset: String
    # baseAssetPrecision: Int
    # quoteAsset: String
    # quotePrecision: Int
    # quoteAssetPrecision: Int
    # baseCommissionPrecision: Int
    # quoteCommissionPrecision: Int
    # orderTypes: [String]
    # icebergAllowed: Boolean
    # ocoAllowed: Boolean
    # quoteOrderQtyMarketAllowed: Boolean
    # isSpotTradingAllowed: Boolean
    # isMarginTradingAllowed: Boolean
    # filters: [BinanceSymbolFilter]
    # permissions: [String]
    """
    Symbol
    """
    symbol: String
    """
    Status
    """
    status: String
    """
    Base asset
    """
    baseAsset: String
    """
    Base asset precision
    """
    baseAssetPrecision: Int
    """
    Quote asset
    """
    quoteAsset: String
    """
    Quote precision
    """
    quotePrecision: Int
    """
    Quote asset precision
    """
    quoteAssetPrecision: Int
    """
    Base commission precision
    """
    baseCommissionPrecision: Int
    """
    Quote commission precision
    """
    quoteCommissionPrecision: Int
    """
    Order types
    """
    orderTypes: [String]
    """
    Iceberg allowed
    """
    icebergAllowed: Boolean
    """
    Oco allowed
    """
    ocoAllowed: Boolean
    """
    Quote order qty market allowed
    """
    quoteOrderQtyMarketAllowed: Boolean
    """
    Is spot trading allowed
    """
    isSpotTradingAllowed: Boolean
    """
    Is margin trading allowed
    """
    isMarginTradingAllowed: Boolean
    """
    Filters
    """
    filters: [BinanceSymbolFilter]
    """
    Permissions
    """
    permissions: [String]
  }

  type BinanceSymbolFilter {
    # filterType: String
    # minPrice: Float
    # maxPrice: Float
    # tickSize: Float
    # multiplierUp: Float
    # multiplierDown: Float
    # avgPriceMins: Int
    # minQty: Float
    # maxQty: Float
    # stepSize: Float
    # minNotional: Float
    # applyToMarket: Boolean
    # limit: Int
    # maxNumOrders: Int
    # maxNumAlgoOrders: Int

    """
    Filter type
    """
    filterType: String
    """
    Min price
    """
    minPrice: Float
    """
    Max price
    """
    maxPrice: Float
    """
    Tick size
    """
    tickSize: Float
    """
    Multiplier up
    """
    multiplierUp: Float
    """
    Multiplier down
    """
    multiplierDown: Float
    """
    Avg price mins
    """
    avgPriceMins: Int
    """
    Min qty
    """
    minQty: Float
    """
    Max qty
    """
    maxQty: Float
    """
    Step size
    """
    stepSize: Float
    """
    Min notional
    """
    minNotional: Float
    """
    Apply to market
    """
    applyToMarket: Boolean
    """
    Limit
    """
    limit: Int
    """
    Max num orders
    """
    maxNumOrders: Int
    """
    Max num algo orders
    """
    maxNumAlgoOrders: Int
  }
`;
