import React from "react";
import {
  Text,
  View,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  ViewStyle
} from "react-native";

import { graphql, Query, QueryResult } from "react-apollo";
import gql from "graphql-tag";

import { TopAreas } from "../graphql/__generated__/TopAreas";
import AreaTag from "../containers/AreaTag";

import { identicalKeyExtractor } from "./utils";

const TOP_AREA_QUERY = gql`
  query TopAreas {
    topAreas
  }
`;
// !higher order components
// const withAreas = graphql<{}, TopAreas>(TOP_AREA_QUERY);

const renderArea = ({ item }: ListRenderItemInfo<string>) => {
  // console.log(`rendering ${JSON.stringify(item)}`);
  return <AreaTag area={item} />;
};

const render = ({ loading, data, error }: QueryResult<TopAreas>) => {
  if (loading) {
    return <Text> Loading... </Text>;
  }
  if (error) {
    return <Text> {error.message} </Text>;
  }

  return (
    <View style={styles.listContianer}>
      {data ? (
        <FlatList
          data={data.topAreas}
          renderItem={renderArea}
          keyExtractor={identicalKeyExtractor}
          horizontal
        />
      ) : (
        <Text>undefined</Text>
      )}
    </View>
  );
};

interface Style {
  listContianer: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  listContianer: {
    // flex: 1,
    marginVertical: 10
  }
});

// TODO learn more about the type of the Query component
export const AreaList = () => <Query query={TOP_AREA_QUERY}>{render}</Query>;

export default AreaList;
