import React from "react";
import { Text, View } from "react-native";

interface Props {
  title: string;
}
export const DetailSectionTitle = ({ title }: Props) => {
  return (
    <View>
      <Text style={{ fontSize: 13, fontWeight: "bold", textAlign: "center" }}>
        {title}
      </Text>
      <View
        style={{
          borderBottomColor: "black",
          borderBottomWidth: 1
        }}
      />
    </View>
  );
};
export default DetailSectionTitle;
