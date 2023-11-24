require('dotenv').config();

export default () => {
  const {
    REDIS_CLUSTER_DEFAULT_HOST_ONE: redisClusterHostOne,
    REDIS_CLUSTER_DEFAULT_PORT_ONE: redisClusterPortOne,
    REDIS_CLUSTER_DEFAULT_HOST_TWO: redisClusterHostTwo,
    REDIS_CLUSTER_DEFAULT_PORT_TWO: redisClusterPortTwo,
    REDIS_CLUSTER_DEFAULT_HOST_THREE: redisClusterHostThree,
    REDIS_CLUSTER_DEFAULT_PORT_THREE: redisClusterPortThree
  } = process.env;

  const redisClusterOne =
    redisClusterPortOne &&
    redisClusterPortOne.split(',').map((port) => {
      return {
        host: redisClusterHostOne,
        port: port
      };
    });

  const redisClusterTwo =
    redisClusterPortTwo &&
    redisClusterPortTwo.split(',').map((port) => {
      return {
        host: redisClusterHostTwo,
        port: port
      };
    });

  const redisClusterThree =
    redisClusterPortThree &&
    redisClusterPortThree.split(',').map((port) => {
      return {
        host: redisClusterHostThree,
        port: port
      };
    });

  return [...redisClusterOne, ...redisClusterTwo, ...redisClusterThree];
};
