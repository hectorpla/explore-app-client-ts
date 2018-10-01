import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps
} from "react-native";
import TabBarIcon from "./TabBarIcon";
import { Link, matchPath } from "react-router-native";

export interface Props {
  title: string;
  to: string;
  currentPathName: string;
  computeName: (focused: boolean) => string;
}

/**
 * observation: whether TableBarIcon is enlighten depends on the whether the route is matched
 * couple the focused focused and the generation of name
 * ! mind the conflict with name of the React Native component
 * @param props
 */
const TabBarLinkView = ({ title, to, currentPathName, computeName }: Props) => {
  const focused = !!matchPath(to, { path: currentPathName });
  return (
    <Link to={to} replace component={TouchableOpacity}>
      <View style={{ alignItems: "center" }}>
        <TabBarIcon focused={focused} name={computeName(focused)} />
        <Text style={{ textAlign: "center" }}>{title}</Text>
      </View>
    </Link>
  );
};

export default TabBarLinkView;
