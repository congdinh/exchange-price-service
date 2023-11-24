import { BinanceAPIDataSource } from './binance';

export interface Context {
  dataSources: {
    binanceAPI: BinanceAPIDataSource;
  };
}

export const dataSources = () => ({
  binanceAPI: new BinanceAPIDataSource()
});

export { BinanceAPIDataSource };
