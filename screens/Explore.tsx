import React from "react";
import { View } from "react-native";

import { AreaList } from "../components/AreaList";
import PictureWall from "../containers/PictureWall";
import PlaceDetails from "../components/PlaceDetails";
import { StoreState } from "../types";
import { connect } from "react-redux";

interface Props {
  activeArea?: string;
}
export const Explore = ({ activeArea }: Props) => (
  <View>
    <AreaList />
    {activeArea && <PictureWall />}
    <PlaceDetails alias={"tokyo"} /> {/* TODO: tempo for test */}
  </View>
);

function mapStateToProps(state: StoreState): Props {
  return { activeArea: state.activeArea };
}

export default connect(mapStateToProps)(Explore);
