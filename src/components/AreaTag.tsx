import React from "react";
import { Text, TouchableHighlight, GestureResponderEvent } from "react-native";
import Color from "../constants/Colors";

export interface Props {
  area: string;
  onSelect?: (term: string) => void;
}

const AreaTag = ({ area, onSelect }: Props) => (
  <TouchableHighlight
    style={{
      borderWidth: 1,
      borderColor: Color.areaTagBackground,
      borderRadius: 8,
      backgroundColor: Color.areaTagBackground,
      marginHorizontal: 5,
      paddingHorizontal: 3,
      paddingVertical: 2
    }}
    onPress={() => onSelect!(area)}
  >
    <Text
      style={{
        color: "white",
        textAlign: "center",
        fontSize: 16
      }}
    >
      {area}
    </Text>
  </TouchableHighlight>
);

export default AreaTag;
