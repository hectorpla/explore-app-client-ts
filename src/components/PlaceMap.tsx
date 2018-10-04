import React from "react";
import { Yelp_Business_business_coordinates } from "../../graphql/yelp/__generated__/Yelp_Business";
import { Text, View } from "react-native";
import MapView from "react-native-maps";
import DetailSectionTitle from "./DetailSectionTitle";

export interface MapProps {
  coords: Yelp_Business_business_coordinates | null;
}
export const PlaceMap = ({ coords }: MapProps) => {
  if (!coords) {
    return <Text> No coordinates </Text>;
  }
  const { latitude, longitude } = coords;
  return (
    <View style={{ marginVertical: 10, alignSelf: "stretch" }}>
      <DetailSectionTitle title={"Map"} />
      <Text>
        coordinate: {latitude}, {longitude}
      </Text>
      <View>
        <MapView
          style={{ height: 300, width: "100%" }}
          initialRegion={{
            latitude: latitude!,
            longitude: longitude!,
            latitudeDelta: 0.009,
            longitudeDelta: 0.009
          }}
        />
      </View>
    </View>
  );
};
export default PlaceMap;
