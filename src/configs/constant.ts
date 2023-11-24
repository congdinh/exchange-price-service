export const SHARED_STATUS = {
  INACTIVE: 1,
  ACTIVE: 2,
  DEACTIVE: 3,
  DELETED: 4
};

export const SORT_TYPE = {
  DESC: 'desc',
  ASC: 'asc'
};

export const TTL_FOR_QUERY: number = 60 * 15;
export const TTL_FOR_ID: number = 60 * 30;
export const MAXIMUM_LIMIT_SIZE = 500;

export const EXCHANGE_URLS = {
  BINANCE: {
    exchange: 'BINANCE',
    base_api_url: 'https://fapi.binance.com',
    stream_host: 'fstream.binance.com',
    symbol_info_url: 'https://api.binance.com/api/v1/exchangeInfo'
  }
};
