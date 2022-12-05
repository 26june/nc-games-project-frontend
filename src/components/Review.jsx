import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReviewsById } from "../api/api";
import ReviewCard from "./ReviewCard";

export default function Review() {
  const [singleReview, setSingleReview] = useState({});

  const { review_id } = useParams();

  useEffect(() => {
    getReviewsById(review_id).then((review) => {
      setSingleReview(review);
    });
  }, []);

  return (
    <div>
      <ReviewCard review={singleReview}></ReviewCard>
      <p>{singleReview.review_body}</p>
    </div>
  );
}
