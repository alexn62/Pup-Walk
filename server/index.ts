import { ApolloServer } from 'apollo-server';
import resolvers from './resolvers/resolvers';
import typeDefs from './typedefs/typedefs';
import mongoose from 'mongoose';

const server = new ApolloServer({ typeDefs, resolvers });

const PORT: number = 4000;
const HOST: string = 'http://localhost:';
const url: string = `${HOST}${PORT}`;

const startServer = async () => {
  const DB_NAME: String = 'dogdb';
  await mongoose.connect(`mongodb://localhost:27017/${DB_NAME}`);

  server.listen(PORT, () => {
    console.log(`🚀  Server ready at ${url}`);
  });
};

startServer();
