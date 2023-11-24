import { IResolvers } from '@graphql-tools/utils';
import { withFilter } from 'graphql-subscriptions';
import pubsub from '../../external-libs/pubsub';

const resolvers: IResolvers = {
  Query: {
    getPriceTickerData: async (_, {symbol}, { logger, dataSources: { binanceAPI } }, info) => {
      return await binanceAPI.getTicker24hrData(symbol);
    },
    getFutureKlineData: async (_, { symbol }, { logger, dataSources: { binanceAPI } }, info) => {
      let klineData = await binanceAPI.getFutureData(symbol);
      klineData = klineData.map((item: any) => {
        return {
          t: item[0],
          o: item[1],
          h: item[2],
          l: item[3],
          c: item[4],
          v: item[5],
          T: item[6],
          q: item[7],
          n: item[8],
          V: item[9],
          Q: item[10],
          B: item[11]
        };
      });
      return klineData;
    }
  },
  Subscription: {
    notifyPriceTickerData: {
      resolve: (payload, args, ctx) => payload,
      subscribe: withFilter(
        () => pubsub.asyncIterator('NOTIFY_PRICE_DATA'),
        (payload, variables, ctx) => {
          console.log('notifyPriceData payload: ', payload);
          console.log('notifyPriceData variables: ', variables);
          if (!variables?.symbol) return true;
          if (variables?.symbol === payload?.data?.s) return true;
          return false;
        }
      )
    },
    notifyTimeData: {
      resolve: (payload, args, ctx) => payload,
      subscribe: withFilter(
        () => pubsub.asyncIterator('NOTIFY_TIME_DATA'),
        (payload, variables, ctx) => {
          return true;
        }
      )
    },
    notifyPriceTickerDataByList: {
      resolve: (payload, args, ctx) => payload,
      subscribe: withFilter(
        () => pubsub.asyncIterator('NOTIFY_PRICE_DATA_BY_LIST'),
        (payload, variables, ctx) => {
          if (!variables?.symbols) return true;
          if (variables?.symbols.includes(payload?.data?.s)) return true;
          return false;
        }
      )
    },

    notifyKlineDataByList: {
      resolve: (payload, args, ctx) => payload,
      subscribe: withFilter(
        () => pubsub.asyncIterator('NOTIFY_KLINE_DATA_BY_LIST'),
        (payload, variables, ctx) => {
          if (!variables?.symbols) return true;
          if (variables?.symbols.includes(payload?.data?.s)) return true;
          return false;
        }
      )
    }
  }
};

export default resolvers;
