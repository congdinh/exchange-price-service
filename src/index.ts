import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { ApolloServerPluginInlineTrace } from '@apollo/server/plugin/inlineTrace';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault
} from '@apollo/server/plugin/landingPage/default';
import depthLimit from 'graphql-depth-limit';

import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { subscribe, execute } from 'graphql';
import schema from './graphql';
import { Context, dataSources } from './datasources';

import createError from 'http-errors';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';

import Logger from './external-libs/winston';
import routes from './routes';
require('dotenv').config();

const {
  NODE_ENV,
  PORT,
  SERVER_REQUEST_WHITE_LIST,
  SERVER_CORS_ENABLED,
  APOLLO_PATH,
  APOLLO_SUBSCRIPTION_PATH,
} = process.env;

const port = parseInt(PORT || '9021', 10);
const whitelist = SERVER_REQUEST_WHITE_LIST || '';
const corsEnabled = SERVER_CORS_ENABLED === 'true';

async function init() {
  const app = express();

  // parse application/json
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  let corsOptions: any = {
    origin(origin: string, callback: any) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed access!'));
      }
    }
  };

  if (!corsEnabled) {
    corsOptions = {};
  }

  app.use(compression());
  app.use(cors(corsOptions));
  if (NODE_ENV === 'production') {
    app.use(helmet());
  }

  // TODO Enable CORS
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Accept-Encoding, Accept-Language, Access-Control-Request-Headers, Access-Control-Request-Method'
    );
    next();
  });

  // catch 404 and forward to error handler
  app.use((err: any, req: any, res: any, next: any) => {
    next(createError(404));
  });

  // error handler
  app.use((err: any, req: any, res: any, next: any) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({ message: 'Not allowed access!' });
  });

  // Use Route
  app.use('/api', routes);

  app.get('/', (req, res) => {
    res.status(404).send();
  });

  app.get('/health', (req, res) => {
    res.status(200).json({
      success: true,
      name: 'Service',
      version: '1.0',
      status: 'green'
    });
  });

  // Create the schema, which will be used separately by ApolloServer and
  // the WebSocket server.

  // Create an Express app and HTTP server; we will attach both the WebSocket
  // server and the ApolloServer to this HTTP server.
  const httpServer = createServer(app);
  const logger = new Logger();

  // Create our WebSocket server using the HTTP server we just set up.
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: APOLLO_SUBSCRIPTION_PATH || '/graphql'
  });

  // the function that sets up the global context for each resolver, using the req
  interface ContextValue extends Context {
    logger: Logger;
  }

  // Save the returned server's info so we can shutdown this server later
  const serverCleanup = useServer(
    {
      schema,
      subscribe,
      execute,
      onSubscribe: (_ctx, msg) => {
        console.log('Subscription: %j', msg);
      },
      onConnect: (_ctx) => {
        console.log('Connect: ', _ctx.connectionParams);
      },
      onDisconnect: (_ctx, code, reason) => {
        console.log('Disconnect: ', reason);
      }
    },
    wsServer
  );

  // Set up ApolloServer.
  const server = new ApolloServer<ContextValue>({
    schema,
    csrfPrevention: true,
    cache: 'bounded',
    validationRules: [depthLimit(7)],
    formatError: (error) => {
      // filter whatever errors your don't want to log
      logger.error(`[GraphQL.error]`, error);
      return {
        message: error.message,
        errorCode: (error.extensions && error.extensions.code) || null,
        extensions: { ...error.extensions }
      };
    },
    plugins: [
      ApolloServerPluginInlineTrace(),
      // Install a landing page plugin based on NODE_ENV
      NODE_ENV === 'production'
        ? ApolloServerPluginLandingPageProductionDefault({
            graphRef: 'neo-graph-variant',
            footer: false
          })
        : ApolloServerPluginLandingPageLocalDefault({ footer: false, embed: true }),
      // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({ httpServer }),
      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            }
          };
        }
      }
    ]
  });

  await server.start();

  app.use(
    APOLLO_PATH || '/graphql',
    // cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async () => {
        return {
          logger,
          dataSources: dataSources()
        };
      }
    })
  );

  // Now that our HTTP server is fully set up, we can listen to it.
  httpServer.listen(port, () => {
    console.log(`Restful Server is now running on http://localhost:${port}/api/v1`);
    console.log(`HealthCheck at http://localhost:${port}/health`);
    console.log(`GraphQL Server is now running on http://localhost:${port}/graphql`);
    console.log(`WebSocket Server is now running on http://localhost:${port}/graphql`);
  });
}

init();
