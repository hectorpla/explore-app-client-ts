import React from "react";
import { View } from "react-native";

import AreaList from "../components/AreaList";
import PictureWall from "../containers/PictureWall";
import PlaceDetails from "../components/PlaceDetails";
import { StoreState } from "../types";
import { connect } from "react-redux";
import { Route } from "react-router-native";

// TODO bad placement of codes, rearrange

interface Props {
  activeArea?: string;
}
const ListingComponent = ({ activeArea }: Props) => (
  <View style={{ flex: 1 }}>
    <AreaList />
    {activeArea && <PictureWall />}
  </View>
);

function mapStateToProps(state: StoreState): Props {
  return { activeArea: state.activeArea };
}

const Listing = connect(mapStateToProps)(ListingComponent);

const Explore = () => (
  <View style={{ flex: 1 }}>
    <Route exact path="/explore" component={Listing} />
    <Route path="/explore/detail/:alias" component={PlaceDetails} />
    {/* <PlaceDetails
      match={{
        params: { alias: "皇居東御苑-千代田区-2" },
        isExact: false,
        path: "random",
        url: "random"
      }}
    /> */}
  </View>
);

export default Explore;
