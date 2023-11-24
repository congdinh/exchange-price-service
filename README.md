# Exchange Price Service

> Stream Trading Price data and config

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Downloads Stats][npm-downloads]][npm-url]
[![MIT License][license-shield]][license-url]

One to two paragraph statement about your product and what it does.

![](https://github.com/othneildrew/Best-README-Template/raw/master/images/logo.png)

<!-- GETTING STARTED -->

## Installing / Getting started

You must be a member and added ssh key of workspace on bitbucket/gitlab. Clone the repo

```sh
git clone
```

## Development setup

### Built With

- "@apollo/datasource-rest": "^6.2.1"
- "@apollo/server": "^4.9.3"
- "@apollo/subgraph": "^2.5.5"
- "graphql": "^16.8.1"
- "graphql-redis-subscriptions": "^2.6.0"
- "graphql-subscriptions": "^2.0.0"
- ...

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- NodeJS v20
- Redis v5.x to up
- Redis Single or Redis Cluster Nodes

### Setting up

Follow all step bellow to setup your dev environment

1. Setup as `Installing / Getting started`

2. Start your environment (We are using Docker for environment setup)

3. Setup environment variables.
   Create environment config file and config `redis` connection params

   ```sh
   cp .env.example .env

   # For docker production environment
   cp .env.production .env
   ```

4. Install NPM packages

   ```sh
   yarn install
   ```

5. Run development:

- Start server: `yarn dev`
- Start stream data ticker: `yarn stream:ticker`
- Start stream data funding rate: `yarn stream:funding`

- You can start via docker compose

  ```sh
  docker-compose up -d

  docker-compose ps
  ```

6. Health check:

- Health check: `http://localhost:9021/health`
- GraphQL: `http://localhost:9021/graphql`
- Restful: `http://localhost:9021/api/v1`
- WebSocket: `ws://localhost:9021/graphql`

### Building

Test your code before build.

```shell
$ yarn test:coverage
```

Run build command

```shell
$ sh build.sh
```

### Deploying / Publishing

Push your code to your branch with format `[__YOUR_USERNAME__]/[__FEATURE__]`

```shell
$ git add .
$ git commit -m "__COMMIT_MESSAGE__"
$ git push origin [__YOUR_USERNAME__]/[__FEATURE__]
```

Then go to repository server and make a pull request to branch `development`.

**IMPORTANT**: Don't push anything to `master` by yourself. A CI tool will run all step and merge to `master` for you.

## Production setup

- Install dependencies in production

```sh
yarn install --production=true
```

## Configuration

On `.env`, you must config all environment variables bellow. By default, `.env.example` is used default config for all service.

```
REDIS_URL = redis://127.0.0.1:6379/0
REDIS_EXPIRE_TIME = 300

# Redis Cluster 1
REDIS_CLUSTER_DEFAULT_HOST_ONE=127.0.0.1
REDIS_CLUSTER_DEFAULT_PORT_ONE=7000,7001,7002,7003,7004,7005

# Redis Cluster 2
REDIS_CLUSTER_DEFAULT_HOST_TWO=
REDIS_CLUSTER_DEFAULT_PORT_TWO=

# Redis Cluster 3
REDIS_CLUSTER_DEFAULT_HOST_THREE=
REDIS_CLUSTER_DEFAULT_PORT_THREE=
```

## Binance API Usage

1. Funding Rate: [https://www.binance.com/fapi/v1/premiumIndex](https://www.binance.com/fapi/v1/premiumIndex)
2. Price Ticker Stream: [https://binance-docs.github.io/apidocs/futures/en/#individual-symbol-ticker-streams](https://binance-docs.github.io/apidocs/futures/en/#individual-symbol-ticker-streams)
3. Tradingview Get Socket: [https://binance-docs.github.io/apidocs/futures/en/#kline-candlestick-streams](https://binance-docs.github.io/apidocs/futures/en/#kline-candlestick-streams)

## Tests

The test library is [Jest](https://github.com/facebook/jest).

- All test files must be located on `__tests__` and naming by format `[name].spec.js`

- The folders/files on `__tests__` must be as same as on `src` folder.

Just test

```sh
 yarn test
```

Test a file

```sh
 yarn test path/to/test/file
```

Test with coverage information

```sh
 yarn test:coverage
```

## Versioning

- [Current] `stable`: All code is on `master`

- v1.0.0: Exchange Price Service

## Contributing

1. Fork it (<https://github.com/yourname/yourproject/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

## Licensing

Neo – @DEV

Private License.

All Rights Reserved

- Unauthorized copying of this file, via any medium is strictly prohibited
- Proprietary and confidential

<!-- Markdown link & img dfn's -->

[npm-image]: https://img.shields.io/npm/v/datadog-metrics.svg?style=flat-square
[npm-url]: https://npmjs.org/package/datadog-metrics
[npm-downloads]: https://img.shields.io/npm/dm/datadog-metrics.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/dbader/node-datadog-metrics/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/dbader/node-datadog-metrics
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=flat-square
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
