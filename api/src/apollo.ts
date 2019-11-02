import { ApolloServer } from 'apollo-server-express';
import { buildFederatedSchema } from '@apollo/federation';
import typeDefs from './schemas/typedefs';
import resolvers from './schemas/resolvers';

const server = new ApolloServer({
  schema: buildFederatedSchema({ typeDefs, resolvers }),
});

export default {
  server,
};
