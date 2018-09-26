import React from "react";
import { View } from "react-native";

import { AreaList } from "../components/AreaList";
import PictureWall from "../containers/PictureWall";

export const Explore = () => (
  <View>
    <AreaList />
    <PictureWall />
  </View>
);

export default Explore;
