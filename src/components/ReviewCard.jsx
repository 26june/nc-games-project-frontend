import React from "react";
import { useNavigate } from "react-router-dom";

export default function ReviewCard({ review }) {
  const {
    review_id,
    title,
    category,
    designer,
    owner,
    review_img_url,
    created_at,
    votes,
    comment_count,
  } = review; //review_body can also be deconstructed from this

  let navigate = useNavigate();

  function handleCommentClick() {
    navigate(`/reviews/${review_id}/comments`);
  }

  return (
    <div className="reviews-list-item">
      <h3>Review by: {owner}</h3>

      <div className="reviewcard-content">
        <div className="reviewcard-content-left">
          <img src={review_img_url} alt={title}></img>
        </div>
        <div className="reviewcard-content-right">
          <h2>{title}</h2>
          <h3>{category}</h3>
          <h3>{designer}</h3>
          <p>{created_at}</p>
        </div>
      </div>

      <div className="reviewcard-buttons">
        <button>⬆️</button>
        {votes}
        <button>⬇️</button>

        <button onClick={handleCommentClick}>💬{comment_count}</button>
      </div>
    </div>
  );
}
