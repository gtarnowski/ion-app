import 'babel-polyfill';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import globalSchema from './schema.graphql';
import initialProcess from './initialProcess'
const resolvers = require('./resolvers');

dotenv.config({ path: `${__dirname}/.env` });

const app = express();


const server = new ApolloServer({
  typeDefs: globalSchema,
  resolvers: resolvers.default,
  playground: {
    endpoint: `http://localhost:4000/graphql`,
    settings: {
      'editor.theme': 'dark',
    },
  },
  context: ({ req }) => ({
    'user-agent': req.headers['user-agent'],
    authorization: req.headers.authorization,
    ip: req.connection.remoteAddress,
  }),
});

app.use(cors());
server.applyMiddleware({
  app,
});

initialProcess();

app.listen(4000, () => console.log('🚀 Express GraphQL Server Now'));
