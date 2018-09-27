import React from "react";
import { View, Image, Text } from "react-native";

import LayoutConstants from "../constants/Layout";

export interface Props {
  imageUrl: string;
  title: string;
  id: string;
}

const PictureWidth = LayoutConstants.window.width / 2 - 10;
const PlaceEpitome = ({ imageUrl, title, id }: Props) => (
  <View style={{ alignItems: "center", marginBottom: 10 }}>
    <Image
      source={{ uri: imageUrl }}
      style={{
        width: PictureWidth,
        height: 200,
        marginHorizontal: 5
      }}
    />
    <Text style={{ textAlign: "center" }}>{title}</Text>
  </View>
);
export default PlaceEpitome;
