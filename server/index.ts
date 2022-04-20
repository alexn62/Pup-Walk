import { ApolloServer } from 'apollo-server';
import resolvers from './resolvers/resolvers';
import typeDefs from './typedefs/typedefs';
import mongoose from 'mongoose';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    const user = '';
    return { user };
  },
});

const SERVER_PORT = 4000;
const HOST = 'localhost:';
const DB_PORT = 27017;
const DB_NAME = 'dogdb';
const SERVER_URL = `http://${HOST}${SERVER_PORT}`;

mongoose.connect(`mongodb://${HOST}${DB_PORT}/${DB_NAME}`);

const startServer = async (): Promise<void> => {
  server.listen(SERVER_PORT, () => {
    console.log(`🚀  Server ready at ${SERVER_URL}`);
  });
};

startServer();

export = server;
