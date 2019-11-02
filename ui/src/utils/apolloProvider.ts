import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { VueConstructor } from 'vue';
import VueApollo from 'vue-apollo';

export default function getApolloProvider(Vue: VueConstructor) {
  // Setup and use VueApollo
  const httpLink = new HttpLink({
    // You should use an absolute URL here
    uri: process.env.GRAPHQL_URL,
  });
  const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    connectToDevTools: true,
    defaultOptions: {
      query: {
        fetchPolicy: 'cache-first',
      },
    },
  });
  const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
  });

  Vue.use(VueApollo);
  return apolloProvider;
}
