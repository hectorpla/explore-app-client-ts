import React from "react";
import { View, Text, Platform } from "react-native";

import { generalContainer } from "../constants/Styles";
import { withRouter } from "react-router-dom";
import Explore from "../screens/Explore";
import { Link, Route } from "react-router-native";
import TabBarIcon from "./TabBarIcon";

// static screen without props
export interface Screen {
  uri: string;
  component: JSX.Element;
  tabIcon: JSX.Element;
}

interface Props {
  screens: Screen[];
}

const Walk = () => {
  console.log("Walk");
  return <Text> Awaiting Features </Text>;
};

// temporary hard code the Routes, TODO: generalize it later
export const AppNav = () => {
  return (
    <View
      style={{
        // ...generalContainer,
        // justifyContent: "flex-end",
        flex: 1
      }}
    >
      {/* TODO: style for each route to strech */}
      <View style={{ height: 50 }} />

      <Route path="/explore" component={Explore} />
      <Route exact path="/walk" component={Walk} />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly"
        }}
      >
        <Link to="/explore">
          <View>
            <TabBarIcon
              focused={false}
              name={
                Platform.OS === "ios"
                  ? `ios-information-circle${false ? "" : "-outline"}`
                  : "md-information-circle"
              }
            />
            <Text>Explore</Text>
          </View>
        </Link>
        <Link to="/walk">
          <TabBarIcon
            focused={false}
            name={
              Platform.OS === "ios"
                ? `ios-link${false ? "" : "-outline"}`
                : "md-link"
            }
          />
        </Link>
      </View>
    </View>
  );
};

export default withRouter(AppNav);
