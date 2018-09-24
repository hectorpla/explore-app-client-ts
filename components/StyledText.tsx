import React from "react";
import { Text } from "react-native";

// TODO type style latter
export class MonoText extends React.Component<{ style: any }> {
  render() {
    return (
      <Text
        {...this.props}
        style={[this.props.style, { fontFamily: "space-mono" }]}
      />
    );
  }
}
