import * as React from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  AppRegistry
} from "react-native";
import { AppLoading, Asset, Font } from "expo";
// import AppNavigator from "./navigation/AppNavigator";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import { createStore } from "redux";
import { StoreState } from "./types";
import { reducer } from "./reducers";
import { AppAction } from "./actions";
import { Provider as RedxuProvider } from "react-redux";
import {
  NativeRouter,
  MemoryRouter,
  withRouter,
  Route,
  Router,
  RouteComponentProps
} from "react-router-native";
import {
  UnregisterCallback,
  Location,
  Action,
  createMemoryHistory
} from "history";

import PlaceDetails from "./components/PlaceDetails";
import AppNav from "./components/AppNav";

const store = createStore<StoreState, AppAction, {}, {}>(reducer);
store;
// setup guide
const client = new ApolloClient({
  uri: "http://10.0.0.248:3010/graphql"
});

// official setup: https://s3.amazonaws.com/apollo-docs-1.x/redux.html
const App = () => {
  const history = createMemoryHistory({
    initialEntries: ["/explore"]
  });
  return (
    <RedxuProvider store={store}>
      <ApolloProvider client={client}>
        <Router history={history}>
          <AppContainer />
        </Router>
      </ApolloProvider>
    </RedxuProvider>
  );
};
export default App;

AppRegistry.registerComponent("ExploreApp", () => App);

interface Props extends RouteComponentProps {
  skipLoadingScreen?: boolean;
}
export class Root extends React.Component<Props> {
  state = {
    isLoadingComplete: false
  };

  unlisten?: UnregisterCallback;

  componentWillMount = () => {
    this.unlisten = this.props.history.listen(
      (location: Location, action: Action) =>
        console.log(
          `router change, location: ${JSON.stringify(
            location
          )}, action: ${action}` +
            "\n" +
            `history: ${JSON.stringify(this.props.history)}`
        )
    );
  };

  componentWillUnmount = () => {
    this.unlisten!();
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
          {/* <Route path="/detail/:alias" component={PlaceDetails} /> */}
          <AppNav />
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        // ? edit: remove Icon
        // ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
      })
    ]).then(() => {}); // ? edit: type it to compile
  };

  _handleLoadingError = (error: any) => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

// ! should wrap with withRouter
const AppContainer = withRouter<Props>(Root);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
