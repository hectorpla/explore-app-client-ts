import React from "react";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

import Colors from "../constants/Colors";

export type TabType = "Ionicons" | "FontAwesome";
export default class TabBarIcon extends React.Component<{
  name: string;
  focused: boolean;
  type?: TabType;
}> {
  render() {
    const props: Ionicons["props"] = {
      name: this.props.name,
      size: 26,
      style: { marginBottom: -3 },
      color: this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault
    };
    return this.props.type === "FontAwesome" ? (
      <FontAwesome {...props} />
    ) : (
      <Ionicons {...props} />
    );
  }
}
