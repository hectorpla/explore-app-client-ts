import React from "react";
import { View } from "react-native";

export interface Props {
  message?: string;
}
export const LoadingMessage = ({ message }: Props) => {
  return <View>{`Loading... ${message}`}</View>;
};
export default LoadingMessage;
