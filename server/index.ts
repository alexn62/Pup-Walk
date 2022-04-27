import { ApolloServer } from 'apollo-server';
import resolvers from './resolvers/resolvers';
import typeDefs from './typedefs/typedefs';
import mongoose from 'mongoose';
import 'dotenv/config';
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const SERVER_PORT = Number(process.env.SERVER_PORT);
const HOST = process.env.HOST;
const DB_PORT = Number(process.env.DB_PORT);
const DB_NAME = process.env.DB_NAME;
const SERVER_URL = `http://${HOST}:${SERVER_PORT}`;

mongoose.connect(`mongodb://${HOST}:${DB_PORT}/${DB_NAME}`);

const startServer = async (): Promise<void> => {
  server.listen(SERVER_PORT, () => {
    console.log(`🚀  Server ready at ${SERVER_URL}`);
  });
};

startServer();

export = server;
