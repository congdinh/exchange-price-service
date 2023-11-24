import gql from 'graphql-tag';
import GraphQLJSON from 'graphql-type-json';
import { buildSubgraphSchema } from '@apollo/subgraph';
import Realtime from './realtime';
import Binance from './binance';

const initTypeDefs = gql`
  scalar JSON
  scalar Date
`;

const initResolvers = {
  JSON: GraphQLJSON
};

const federationSources: any = [
  {
    typeDefs: initTypeDefs,
    resolvers: initResolvers
  },
  Realtime,
  Binance
];

const schema = buildSubgraphSchema(federationSources);

export default schema;
