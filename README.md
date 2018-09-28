# Todo

- [] add tslint rules
- [] introduce logger module

# Challenges

- couldn't re-render if even the root component is functional, should introduce Redux

# Decisions

## one graphql endpoint or multiple?

Arugments are made online:

- how to achieve multiple clients: [apollo-mul-clients]
- advantage of one endpoint (one round trip; simplicity)
- there are actually constructs in apollo client to allow multiple clients (client props in Query component)

### about Yelp API

Yelp doesn't support `CORS` which cause apollo clients to get 400 response([yelp-react-graphql]). There are work-around by making requests on my server([yelp-cors]).

note: there are mobile projects (Android) that can directly take advantage of Yel API. Is Reactive native counted as a `browser`?

### Address the problem

on hand: set up a server wrap the Fusion API completely with the same types (Business, search, etc.)

[apollo-mul-clients]: https://medium.com/open-graphql/apollo-multiple-clients-with-react-b34b571210a5
[yelp-cors]: https://github.com/Yelp/yelp-fusion/issues/64
[yelp-react-graphql]: https://github.com/Yelp/yelp-fusion/issues/403
