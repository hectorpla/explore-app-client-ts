import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";

import LayoutConstants from "../constants/Layout";
import { Link } from "react-router-native";

export interface Props {
  imageUrl: string;
  title: string;
  id: string;
}

// TODO black frame when clicking link, make the TouchableOpacity work
const PictureWidth = LayoutConstants.window.width / 2 - 10;
const PlaceEpitome = ({ imageUrl, title, id }: Props) => (
  <Link to={`/explore/detail/${id}`}>
    {/* TODO: introduce TouchableOpacity cause Link not able to issue location change */}
    {/* <TouchableOpacity activeOpacity={0.7}> */}
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
    {/* </TouchableOpacity> */}
  </Link>
);
export default PlaceEpitome;
