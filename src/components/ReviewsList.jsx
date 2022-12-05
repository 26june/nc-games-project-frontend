import React, { useEffect, useState } from "react";
import { getReviews } from "../api/api";

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
        const {
          review_id,
          title,
          category,
          designer,
          owner,
          review_body,
          review_img_url,
          created_at,
          votes,
          comment_count,
        } = review;
        return (
          <div key={review_id} className="reviews-list-item">
            <h2>{title}</h2>
            <h2>{category}</h2>
            <p>{designer}</p>
            <p>{owner}</p>
            <p>{created_at}</p>
            <button>Up</button>
            {votes}
            <button>Down</button>
            <button>💬{comment_count}</button>
          </div>
        );
      })}
    </div>
  );
}
