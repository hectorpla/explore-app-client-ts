# Todo

- [] add tslint rules
- [] introduce logger module
- [] fix details loading (PlaceDetails Component)
- [] route config
- [] integrate google maps
- [x] back button (should redux maintain the history of routes? currently by manipulating history in a RouteComponentProps)
- [x] integrate Link with TouchableOpacity (under the Link, add TouchableOpacity, which seems to prevent the press event from bubbling. Link doesn't change route) [solved by changing the component of link]
- [] address the cases clicking the same route, pushing to history stack (replace instead of push)
- [] let web app compile

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

# Style debugging

When dealing with Flex model, sometimes, wierd behaviors happen: an item disappears if some .
Spot error for layers that don't have style, like <Query>.

## draw the tree!

Draw the Render tree from the suspected root, annotate each node with its style.

# React router

## tutorial

Important concepts: Route, Link...  
Try the example on Expo Snack

## Integration

There are many challenges with the existing packages used in the

### conflit with React Navigation

According to https://reacttraining.com/react-router/native/api/withRouter  
`withRouter work with re-renders after location changes propagate out from the <Router> component.`
Issue: React Navigation creates layers that doesn't subscribe to location changes.

### with Redux

almost the same reason with React Navigation (connect())

### conclusion

withRouter (use Route) and Route create
a Consumer to subscribe to location change (github:[https://github.com/ReactTraining/react-router/blob/master/packages/react-router/modules/Route.js])

```javascript
class Route extends React.Component {
  // ...

  render() {
    return (
      <RouterContext.Consumer>
        {context => {
          // ...
          return (
            <RouterContext.Provider value={props}>
              // ...
            </RouterContext.Provider>
          );
        }}
      </RouterContext.Consumer>
    );
  }
}
```

## Using React native router as stack router

Both `NativeRouter` and `MemoryRouter` does not take the history prop, <Router> should be used to maintain a history object of the app. Discussion: https://github.com/ReactTraining/react-router/issues/5229

### react router's style

Uri to identify views (components), while React Navigation
seems to have a more implicit way.

## bugs

don't import Component from wrong libraries. `React-router`, `react-router-native` and `react-router-dom` all have `Link` and other components. Mind the generated code inserted by the IDE.

# Web Support

## challenges

not sure what are supported in the browser

cannot compile

> Module not found: Can't resolve './effects/BlurView' in '/Users/hectorlueng/side-projects/explore-app-client-ts/node_modules/expo/src'

ts-loader seems to load all ts file including node_modules, problems in config

> /Users/hectorlueng/side-projects/explore-app-client-ts/node_modules/@types/expo/index.d.ts
> (1442,52): Cannot find name 'WebGLRenderingContext'.

### fixes to library checking

see tsconfig.json ()
