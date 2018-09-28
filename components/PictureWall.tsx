import React from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  ViewStyle,
  ListRenderItemInfo
} from "react-native";

import { graphql, Query, QueryResult } from "react-apollo";
import gql from "graphql-tag";

import {
  Summary,
  SummaryVariables,
  Summary_areaSummary_photos
} from "../graphql/__generated__/Summary";
import { ErrorSection } from "./ErrorSection";
import * as Styles from "../constants/Styles";
import PlaceEpitome from "./PlaceEpitome";
import { LoadingMessage } from "./LoadingMessage";

const renderItem = ({
  item,
  index
}: ListRenderItemInfo<Summary_areaSummary_photos>) => {
  const photo = item;
  return (
    <PlaceEpitome
      imageUrl={photo.url}
      title={photo.place_name}
      id={photo.place_id}
    />
  );
};

const render = ({ loading, data, error }: QueryResult<Summary>) => {
  if (loading) {
    return <LoadingMessage />;
  }
  if (error) {
    return <ErrorSection message={error.message} />;
  }
  if (!data || !data.areaSummary) {
    // TODO should print the searched area name, but the info not accessable here
    return <ErrorSection message={"Cannot find the area"} />;
  }
  const photos = data.areaSummary.photos;
  // TODO > last row of data is not shown properly
  return (
    <View
      style={{
        alignItems: "center"
      }}
    >
      <FlatList
        data={photos}
        renderItem={renderItem}
        keyExtractor={photo => photo.place_id}
        numColumns={2}
      />
    </View>
  );
};

const PHOTO_QUERY = gql`
  query Photos($term: String!) {
    areaSummary(term: $term) {
      photos {
        url
        place_name
        place_id
      }
    }
  }
`;

export interface Props extends Partial<SummaryVariables> {
  // just as the query argument
}
export const PictureWall = ({ term }: Props) => (
  <View style={Styles.generalContainer}>
    <Query query={PHOTO_QUERY} variables={{ term }}>
      {render}
    </Query>
  </View>
);

const styles = StyleSheet.create({
  // nothing
});

export default PictureWall;
