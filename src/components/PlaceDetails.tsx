import React from "react";
import { Query, QueryResult } from "react-apollo";
import { View, Text, FlatList, ListRenderItemInfo, Button } from "react-native";

import gql from "graphql-tag";
import ApolloClient from "apollo-boost";

import {
  Yelp_BusinessVariables,
  Yelp_Business,
  Yelp_Business_business_reviews,
  Yelp_Business_business
} from "../../graphql/yelp/__generated__/Yelp_Business";
import { ErrorSection } from "./ErrorSection";
import Styles from "../constants/Styles";
import { LoadingMessage } from "./LoadingMessage";
import { ReviewItem } from "./ReviewItem";
import { DetailSectionTitle } from "./DetailSectionTitle";
import { match, RouteComponentProps } from "react-router";
import { BackButton } from "react-router-native";
import PlaceMap from "./PlaceMap";

export interface TitleProps {
  title: string;
}
export const Title = ({ title }: TitleProps) => (
  <Text style={{ fontSize: 16, textAlign: "center", marginVertical: 5 }}>
    {title}
  </Text>
);

export interface ReviewSectionProps {
  reviews: Yelp_Business_business["reviews"]; // ? weird syntax but Good enough
}
export const ReviewsSection = ({ reviews }: ReviewSectionProps) => {
  if (!reviews) {
    return <Text>No reviews available</Text>;
  }
  const filtered = reviews.filter(review => !!review);
  return (
    <View style={{ width: "90%", marginVertical: 5 }}>
      <DetailSectionTitle title={"Review"} />
      <FlatList
        data={filtered as Yelp_Business_business_reviews[]}
        renderItem={({
          item,
          index
        }: ListRenderItemInfo<Yelp_Business_business_reviews>) => {
          return <ReviewItem text={item.text} />;
        }}
        keyExtractor={({ text }: Yelp_Business_business_reviews) =>
          text!.slice(0, 5) + text!.slice(-5)
        }
      />
    </View>
  );
};

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
export const PlaceDetails = ({ match, history }: Props) => {
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
                <Title title={name} />
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
