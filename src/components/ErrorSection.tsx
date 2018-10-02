import React from "react";
import { View, Text } from "react-native";
import { width as windowWidth } from "../constants/Layout";
import Color from "../constants/Colors";

export interface Props {
  message: string;
}

export const ErrorSection = ({ message }: Props) => (
  <View
    style={{
      alignItems: "center",
      marginVertical: 15,
      width: windowWidth * 0.6,
      marginHorizontal: "auto"
    }}
  >
    <Text
      style={{
        height: 20,
        width: "100%",
        backgroundColor: Color.errorBackground,
        // borderRightWidth: 1,
        // borderLeftWidth: 1,
        // borderColor: "rgb(248, 123, 123)",
        borderWidth: 1,
        borderColor: Color.errorBackground,
        borderTopLeftRadius: 5,
        borderTopEndRadius: 5,
        textAlign: "center"
      }}
    >
      Error
    </Text>
    <Text style={{ justifyContent: "center" }}>{message}</Text>
  </View>
);
