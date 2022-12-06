import React from "react";
import { getCommentsByReviewId } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function ReviewCard({ review }) {
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

  let navigate = useNavigate();

  function handleCommentClick() {
    navigate(`/reviews/${review_id}/comments`);
  }

  return (
    <div className="reviews-list-item">
      <div className="reviewcard-image">
        <img src={review_img_url} alt={title}></img>
      </div>
      <div className="reviewcard-owner">Review by: {owner}</div>
      <div className="reviewcard-title">{title}</div>
      <div className="reviewcard-category">{category}</div>
      <div className="reviewcard-designer">{designer}</div>
      <div className="reviewcard-createdat">{created_at}</div>
      <div className="reviewcard-upvote">
        <button>⬆️</button>
      </div>
      <div className="reviewcard-kudos">{votes}</div>
      <div className="reviewcard-downvote">
        <button>⬇️</button>
      </div>
      <div className="reviewcard-comments">
        <button onClick={handleCommentClick}>💬{comment_count}</button>
      </div>
    </div>
  );
}
