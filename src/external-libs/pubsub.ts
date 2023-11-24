require('dotenv').config();
import Redis, { RedisOptions } from 'ioredis';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import redisClusterNodes from '../utils/cluster-config';

const optionPubSub: RedisOptions = {
  enableOfflineQueue: false,
  autoResubscribe: true,
  autoResendUnfulfilledCommands: true,
  maxRetriesPerRequest: 1
};

let redis;
if (process.env.REDIS_CLUSTER_PUBSUB === 'true') {
  const nodes: any = redisClusterNodes();
  console.log('Pubsub nodes: ', nodes);
  redis = new Redis.Cluster(nodes, {
    scaleReads: 'slave',
    redisOptions: optionPubSub
  });
} else {
  const node = process.env.REDIS_URI || '';
  console.log('Pubsub Node: ', node);
  redis = new Redis(node, optionPubSub);
}

export default new RedisPubSub({
  publisher: redis,
  subscriber: redis
});
