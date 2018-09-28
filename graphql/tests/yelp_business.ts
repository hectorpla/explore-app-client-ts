import gql from "graphql-tag";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { YELP_GRAPHQL_REQUEST_HEADER } from "../../config/config";
import fetch from "node-fetch";
import { createHttpLink } from "apollo-link-http";

import ApolloClient2 from "apollo-client";

const QUERY = gql`
  query BUSINESS {
    business(id: "iiQlu4M7uqYezki-rPih4Q") {
      name
      rating
    }
  }
`;

const uri = "https://api.yelp.com/v3/graphql";

const link = createHttpLink({ uri, fetch: fetch });

// const client = new ApolloClient({
//   uri,
//   headers: YELP_GRAPHQL_REQUEST_HEADER
// });
// client.query({ query: QUERY }).then(res => console.log(res));

const client2 = new ApolloClient2({
  link,
  cache: new InMemoryCache()
});

// 400 BAD REQUEST
// creating client in React Component cause `CORS error`
// https://github.com/Yelp/yelp-fusion/issues/403
client2
  .query({
    query: QUERY,
    context: {
      headers: YELP_GRAPHQL_REQUEST_HEADER
    }
  })
  .then(res => console.log(res))
  .catch(err => console.log(err));
