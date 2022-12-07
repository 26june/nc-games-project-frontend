import React from "react";
import { useParams } from "react-router-dom";
import ReviewsList from "./ReviewsList";

export default function CategorisedReview() {
  const { category } = useParams();
  return (
    <div>
      <ReviewsList category={category}></ReviewsList>
    </div>
  );
}
