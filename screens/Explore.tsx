import React from "react";
import { Text, View, FlatList, ListRenderItemInfo } from "react-native";

import { graphql, Query, QueryResult } from "react-apollo";
import gql from "graphql-tag";

import { TopAreas } from "../graphql/__generated__/TopAreas";

const TOP_AREA_QUERY = gql`
  query TopAreas {
    topAreas
  }
`;
// !higher order components
// const withAreas = graphql<{}, TopAreas>(TOP_AREA_QUERY);

const renderArea = ({ item }: ListRenderItemInfo<string>) => {
  // console.log(`rendering ${JSON.stringify(item)}`);
  return <Text> {item} </Text>;
};

const render = ({ loading, data, error }: QueryResult<TopAreas>) => {
  if (loading) {
    return <Text> Loading... </Text>;
  }
  if (error) {
    return <Text> ERROR </Text>;
  }

  return (
    <View>
      {data ? (
        <FlatList
          data={data.topAreas}
          renderItem={renderArea}
          keyExtractor={x => x}
        />
      ) : (
        <Text>undefined</Text>
      )}
    </View>
  );
};

// TODO learn more about the type of the Query component
export const Areas = () => <Query query={TOP_AREA_QUERY}>{render}</Query>;

class AreaList extends React.Component {
  render() {
    return <View>{Areas()}</View>;
  }
}
export default AreaList;
