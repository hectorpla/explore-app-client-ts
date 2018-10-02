import React from "react";
import { View, Text } from "react-native";

export interface Props {
  message?: string;
}
export const LoadingMessage = ({ message }: Props) => {
  return (
    <View>
      <Text>{`Loading... ${message}`}</Text>
    </View>
  );
};
export default LoadingMessage;
