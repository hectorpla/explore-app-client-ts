import React from "react";
import { Query, QueryResult } from "react-apollo";
import { View, Text, FlatList, ListRenderItemInfo } from "react-native";

import gql from "graphql-tag";
import ApolloClient from "apollo-boost";

import {
  Yelp_BusinessVariables,
  Yelp_Business,
  Yelp_Business_business_coordinates,
  Yelp_Business_business_reviews,
  Yelp_Business_business
} from "../graphql/yelp/__generated__/Yelp_Business";
import { ErrorSection } from "./ErrorSection";
import * as Styles from "../constants/Styles";
import { LoadingMessage } from "./LoadingMessage";
import { YELP_GRAPHQL_REQUEST_HEADER } from "../config/config";

export interface TitleProps {
  title: string;
}
export const Title = ({ title }: TitleProps) => (
  <Text style={{ fontSize: 16, textAlign: "center" }}>{title}</Text>
);

export interface MapProps {
  coords: Yelp_Business_business_coordinates | null;
}
export const Map = ({ coords }: MapProps) => {
  if (!coords) {
    return <Text> No coordinates </Text>;
  }
  return (
    <View>
      <Text>
        coordinate: {coords.latitude}, {coords.longitude}
      </Text>
    </View>
  );
};

export interface ReviewSectionProps {
  reviews: Yelp_Business_business["reviews"]; // ? weird syntax but Good enough
}
export const ReviewsSection = ({ reviews }: ReviewSectionProps) => {
  if (!reviews) {
    return <Text>No reviews available</Text>;
  }
  return (
    <View>
      <FlatList
        data={reviews}
        renderItem={({
          item
        }: ListRenderItemInfo<Yelp_Business_business_reviews | null>) => {
          return item && <Text> {item.text} </Text>;
        }}
      />
    </View>
  );
};

const BISINESS_QUERY = gql`
  query BUSINESS {
    business(id: "皇居東御苑-千代田区-2") {
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

// TODO make it a singleton stored in Redux
// ! not working because of CORS
// const client = new ApolloClient({
//   uri: "https://api.yelp.com/v3/graphql",
//   headers: YELP_GRAPHQL_REQUEST_HEADER
// });

export interface Props extends Yelp_BusinessVariables {}
export const PlaceDetails = ({ alias }: Props) => (
  <View style={Styles.generalContainer}>
    <Query query={BISINESS_QUERY}>
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
          return <LoadingMessage />;
        }
        if (!data || !data.business) {
          return <ErrorSection message={"can't find businuess"} />;
        }
        const { name, coordinates, review_count, reviews } = data.business;
        return (
          !!name && (
            <View style={Styles.generalContainer}>
              <Title title={name} />
              <Map coords={coordinates} />
              <ReviewsSection reviews={reviews} />
            </View>
          )
        );
      }}
    </Query>
  </View>
);
export default PlaceDetails;
