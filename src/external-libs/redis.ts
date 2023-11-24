import Redis from 'ioredis';
import redisClusterNodes from '../utils/cluster-config';
require('dotenv').config();

let redis;
if (process.env.REDIS_CLUSTER_PUBSUB === 'true') {
  const nodes: any = redisClusterNodes();
  console.log('Pubsub nodes: ', nodes);
  redis = new Redis.Cluster(nodes, {
    scaleReads: 'slave'
  });
} else {
  const node = process.env.REDIS_URI || '';
  redis = new Redis(node);
}

export default redis;
