import React from "react";

import {
  Yelp_Business_business_reviews,
  Yelp_Business_business
} from "../../graphql/yelp/__generated__/Yelp_Business";

import ReviewItem from "./ReviewItem";
import DetailSectionTitle from "./DetailSectionTitle";
import { Text, View, FlatList, ListRenderItemInfo } from "react-native";

export interface ReviewSectionProps {
  reviews: Yelp_Business_business["reviews"]; // ? weird syntax but Good enough
}
const ReviewsSection = ({ reviews }: ReviewSectionProps) => {
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

export default ReviewsSection;
