// TODO remove this file

import React from "react";
import { Platform, View, Text } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import Explore from "../screens/Explore";

type Focusable = {
  focused: boolean;
};

const HomeStack = createStackNavigator({
  Home: Explore
});

HomeStack.navigationOptions = {
  tabBarLabel: "Explore",
  tabBarIcon: ({ focused }: Focusable) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  )
};

const LinksStack = createStackNavigator({
  Links: () => (
    <View>
      <Text>awaiting features</Text>
    </View>
  )
});

LinksStack.navigationOptions = {
  tabBarLabel: "Links",
  tabBarIcon: ({ focused }: Focusable) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-link${focused ? "" : "-outline"}`
          : "md-link"
      }
    />
  )
};

export default createBottomTabNavigator({
  HomeStack,
  LinksStack
});
