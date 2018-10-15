import React from "react";
import { Query, QueryResult } from "react-apollo";
import { View, Text, FlatList, ListRenderItemInfo, Button } from "react-native";

import gql from "graphql-tag";
import ApolloClient from "apollo-boost";

import {
  Yelp_BusinessVariables,
  Yelp_Business
} from "../../graphql/yelp/__generated__/Yelp_Business";
import { ErrorSection } from "./ErrorSection";
import Styles from "../constants/Styles";
import { LoadingMessage } from "./LoadingMessage";

import { match, RouteComponentProps } from "react-router";
import PlaceMap from "./PlaceMap";
import ReviewsSection from "./ReviewsSection";

export interface TitleProps {
  title: string;
}
const PlaceTitle = ({ title }: TitleProps) => (
  <Text style={{ fontSize: 16, textAlign: "center", marginVertical: 5 }}>
    {title}
  </Text>
);

const BISINESS_QUERY = gql`
  query BUSINESS($id: String!) {
    business(id: $id) {
      name
      rating
      alias
      location {
        postal_code
      }
      coordinates {
        latitude
        longitude
      }
      photos
      review_count
      reviews {
        text
        user {
          image_url
        }
      }
    }
  }
`;

export interface Props extends RouteComponentProps {
  match: match<Yelp_BusinessVariables>;
}
const PlaceDetails = ({ match, history }: Props) => {
  const { params } = match;
  const { alias } = params;
  console.log(`Details: ${alias}`);
  // TODO loading not working
  return (
    <View style={Styles.generalContainer}>
      <View style={{ alignSelf: "flex-end" }}>
        <Button
          title="Back"
          onPress={() => {
            // ? good practice to have side effect here (without notifying redux)
            console.log("route: back");
            history.goBack();
          }}
        />
      </View>
      <Query query={BISINESS_QUERY} variables={{ id: alias }}>
        {({ error, data, loading }: QueryResult<Yelp_Business>) => {
          if (error) {
            console.log(error.networkError);
            return (
              <ErrorSection
                message={`coundn't find business(${alias}): ${error.message}`}
              />
            );
          }
          if (loading) {
            console.log("loading details");
            return <LoadingMessage />;
          }
          if (!data || !data.business) {
            return <ErrorSection message={"can't find businuess"} />;
          }
          const { name, coordinates, review_count, reviews } = data.business;
          return (
            !!name && (
              <View style={Styles.generalContainer}>
                <PlaceTitle title={name} />
                <PlaceMap title={name} coords={coordinates} />
                <ReviewsSection reviews={reviews} />
              </View>
            )
          );
        }}
      </Query>
    </View>
  );
};

export default PlaceDetails;
