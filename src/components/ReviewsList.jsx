import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getReviews } from "../api/api";
import ReviewCard from "./ReviewCard";
import Loading from "./loading/Loading";

export default function ReviewsList({ selectedCategory }) {
  const [reviewsState, setReviewsState] = useState([]);
  let navigate = useNavigate();
  function reviewListClick(review_id) {
    navigate(`/reviews/${review_id}`);
  }

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getReviews(selectedCategory).then((reviews) => {
      setReviewsState(reviews);
      setIsLoading(false);
    });
  }, [selectedCategory]);

  return isLoading ? (
    <Loading></Loading>
  ) : (
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
