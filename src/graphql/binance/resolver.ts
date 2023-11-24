import { IResolvers } from '@graphql-tools/utils';
import { EXCHANGE_URLS } from '../../configs/constant';

const resolvers: IResolvers = {
  Query: {
    binanceExchangeInfo: async (_, args, { logger, dataSources: { binanceAPI } }, info) => {
      const data = await binanceAPI.getExchangeInfo();
      return data;
    },
    binanceFundingInfo: async (_, args, { logger, dataSources: { binanceAPI } }, info) => {
      const data = await binanceAPI.getFundingData();
      return data;
    },
    binanceTradingViewConfig: async (_, args, { logger, dataSources: { binanceAPI } }, info) => {
      return EXCHANGE_URLS['BINANCE'];
    }
  }
};

export default resolvers;
