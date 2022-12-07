import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getReviews } from "../api/api";
import ReviewCard from "./ReviewCard";
import Loading from "./loading/Loading";
import { SelectedCategory } from "../context/SelectedCategory";

export default function ReviewsList({ category = "" }) {
  const [reviewsState, setReviewsState] = useState([]);

  const { setSelectedCategory } = useContext(SelectedCategory);

  let navigate = useNavigate();
  function reviewListClick(review_id) {
    navigate(`/reviews/${review_id}`);
  }

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setSelectedCategory(category);
    getReviews(category).then((reviews) => {
      setReviewsState(reviews);
      setIsLoading(false);
    });
  }, [category, setSelectedCategory]);

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
