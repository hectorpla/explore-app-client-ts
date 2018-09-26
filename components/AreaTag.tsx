import React from "react";
import { Text, TouchableHighlight, GestureResponderEvent } from "react-native";

export interface Props {
  area: string;
  onSelect?: (term: string) => void;
}

const tagColor = "rgba(242, 140, 38, 0.9)";
const AreaTag = ({ area, onSelect }: Props) => (
  <TouchableHighlight
    style={{
      borderWidth: 1,
      borderColor: tagColor,
      borderRadius: 8,
      backgroundColor: tagColor,
      marginHorizontal: 5,
      paddingHorizontal: 3,
      paddingVertical: 2
    }}
    onPress={() => onSelect!(area)}
  >
    <Text
      style={{
        color: "white",
        textAlign: "center"
      }}
    >
      {area}
    </Text>
  </TouchableHighlight>
);

export default AreaTag;
