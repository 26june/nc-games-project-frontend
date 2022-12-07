import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getReviews } from "../api/api";
import ReviewCard from "./ReviewCard";

export default function ReviewsList() {
  const [reviewsState, setReviewsState] = useState([]);
  let navigate = useNavigate();
  function reviewListClick(review_id) {
    navigate(`/reviews/${review_id}`);
  }

  useEffect(() => {
    getReviews().then((reviews) => {
      setReviewsState(reviews);
    });
  }, []);

  return (
    <div className="reviews-list-container">
      {reviewsState.map((review) => {
        return (
          <div
            key={review.review_id}
            onClick={() => {
              reviewListClick(review.review_id);
            }}
          >
            <ReviewCard review={review} showButtons={false}></ReviewCard>
          </div>
        );
      })}
    </div>
  );
}
