const express = require('express');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');
const graphqlSchema = require('./graphql/schema/index');
const graphqlResolvers = require('./graphql/resolvers/index');

const PORT = process.env.PORT || 4000;

const server = express();

server.use(
  '/api',
  graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true,
  }),
);
