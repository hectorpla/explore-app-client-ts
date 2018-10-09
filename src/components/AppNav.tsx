import React from "react";
import { View, Text, Platform } from "react-native";

import Explore from "../screens/Explore";
import {
  Link,
  Route,
  matchPath,
  RouteProps,
  withRouter,
  match,
  RouteComponentProps
} from "react-router-native";
import TabBarLinkView from "./TabBarLinkView";
import TabBarIcon from "./TabBarIcon";

// static screen without props
export interface Screen {
  uri: string;
  component: JSX.Element;
  tabIcon: JSX.Element;
}

// this Component is under a route
interface Props extends RouteComponentProps {
  screens?: { [screenName: string]: Screen };
  match: match;
}

const Walk = () => {
  console.log("Walk");
  return <Text style={{ flex: 1 }}> Awaiting Features </Text>;
};

// temporary hard code the Routes, TODO: generalize it later
const AppNav = ({ location }: Props) => {
  // console.log(location);
  // TODO active review change for tab icons
  return (
    <View
      style={{
        marginTop: 50,
        marginBottom: 10,
        flex: 1,
        justifyContent: "space-between"
      }}
    >
      <View style={{ flex: 1 }}>
        <Route path="/explore" component={Explore} />
        <Route exact path="/walk" component={Walk} />
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          flex: 0
        }}
      >
        <TabBarLinkView
          title="Explore"
          to="/explore"
          currentPathName={location.pathname}
          icon={focused => (
            <TabBarIcon
              type="FontAwesome"
              focused={focused}
              name="wpexplorer"
            />
          )}
        />
        <TabBarLinkView
          title="Walk"
          to="/walk"
          currentPathName={location.pathname}
          icon={focused => (
            <TabBarIcon
              focused={focused}
              name={Platform.OS === "ios" ? `ios-walk` : "md-walk"}
            />
          )}
        />
      </View>
    </View>
  );
};

// ! augment the Component props with match
export default withRouter(AppNav);
