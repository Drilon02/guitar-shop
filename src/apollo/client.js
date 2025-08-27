import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';


const client = new ApolloClient({
    link: new HttpLink({ uri: import.meta.env.VITE_GRAPHQL_URL || 'https://graphql-api-brown.vercel.app/api/graphql' }),
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    modelsByBrand: {
                        keyArgs: ["brandSlug", "search", "type"],
                        merge(existing = { items: [] }, incoming) {
                            if (!existing) return incoming;
                            return { ...incoming, items: [...(existing.items || []), ...(incoming.items || [])] };
                        }
                    }
                }
            }
        }
    })
});

export default client;