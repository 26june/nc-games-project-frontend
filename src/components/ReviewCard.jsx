import React from "react";

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
        <button>💬{comment_count}</button>
      </div>
    </div>
  );
}
