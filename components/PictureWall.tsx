import React from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  ViewStyle
} from "react-native";

import { graphql, Query, QueryResult } from "react-apollo";
import gql from "graphql-tag";

import {
  Summary,
  Summary_areaSummary,
  SummaryVariables
} from "../graphql/__generated__/Summary";

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

const render = ({ loading, data, error }: QueryResult<Summary>) => {
  if (loading) {
    return <Text> Loading... </Text>;
  }
  if (error) {
    return <Text> {error.message} </Text>;
  }
  if (!data || !data.areaSummary) {
    // TODO should print the searched area name, but the info not accessable here
    return <Text> Cannot find the area </Text>;
  }
  return (
    <View
      style={
        {
          // flex: 1,
          // justifyContent: "center"
        }
      }
    >
      {data.areaSummary.photos.map(photo => (
        <View key={photo.place_id}>
          <Image
            source={{ uri: photo.url }}
            style={{ width: 200, height: 300 }}
          />
          <Text>{photo.place_name}</Text>
        </View>
      ))}
    </View>
  );
};

export interface Props extends SummaryVariables {
  // just as the query argument
}
export const PictureWall = ({ term }: Props) => (
  <Query query={PHOTO_QUERY} variables={{ term }}>
    {render}
  </Query>
);

export default PictureWall;
