import React from "react";
import { AppRegistry, Text } from "react-native";
import App from "./App";
import { LoadingMessage } from "./components/LoadingMessage";

declare const document: any;

AppRegistry.registerComponent("App", () => App);

AppRegistry.runApplication("App", {
  rootTag: document.getElementById("root")
});
