import React from "react";
import { Text, View } from "react-native";
import Color from "../constants/Colors";

interface Props {
  text: string | null;
  userName?: string;
  rating?: string;
  userUrl?: string;
}
export const ReviewItem = ({ text }: Props) => {
  return (
    <Text
      style={{ backgroundColor: Color.reviewBackGround, marginVertical: 3 }}
    >
      {text ? text.trim() : "<a null review>"}
    </Text>
  );
};
export default ReviewItem;
