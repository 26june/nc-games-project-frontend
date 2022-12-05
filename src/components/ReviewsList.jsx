import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getReviews } from "../api/api";
import ReviewCard from "./ReviewCard";

export default function ReviewsList() {
  const [reviewsState, setReviewsState] = useState([]);

  useEffect(() => {
    getReviews().then((reviews) => {
      setReviewsState(reviews);
    });
  }, []);

  return (
    <div className="reviews-list-container">
      {reviewsState.map((review) => {
        return (
          <Link key={review.review_id} to={`/reviews/${review.review_id}`}>
            <ReviewCard review={review}></ReviewCard>;
          </Link>
        );
      })}
    </div>
  );
}
