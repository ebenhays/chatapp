const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const { PubSub } = require("graphql-yoga");
const data = require("./fixtures.json");
const { allResolvers, allSchemas } = require("./graphql");
require("dotenv").config();
const PORT = process.env.PORT || 5000;
//express
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(helmet());
//subscription
const pubsub = new PubSub();
//apollo server
const server = new ApolloServer({
  typeDefs: allSchemas,
  resolvers: allResolvers,
  context: () => ({
    pubsub,
    data
  })
});

server.applyMiddleware({ app, path: "/graphql" });

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
