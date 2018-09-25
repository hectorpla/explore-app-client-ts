import * as React from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  AppRegistry
} from "react-native";
import { AppLoading, Asset, Font } from "expo";
import AppNavigator from "./navigation/AppNavigator";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

import gql from "graphql-tag";

// setup guide
const client = new ApolloClient({
  uri: "http://localhost:3010/graphql"
});
// client
//   .query({
//     query: gql`
//       query {
//         topAreas
//       }
//     `
//   })
//   .then(result => console.log(result));

const App = () => (
  <ApolloProvider client={client}>
    <Root />
  </ApolloProvider>
);
export default App;

AppRegistry.registerComponent("ExploreApp", () => App);

// TODO type the props
export class Root extends React.Component<{ skipLoadingScreen?: any }> {
  state = {
    isLoadingComplete: false
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
          <AppNavigator />
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require("./assets/images/robot-dev.png"),
        require("./assets/images/robot-prod.png")
      ]),
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
