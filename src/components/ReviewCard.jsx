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
      Review by: {owner}
      <h2>{title}</h2>
      <h2>{category}</h2>
      <p>{designer}</p>
      <p>{created_at}</p>
      <button>⬆️</button>
      {votes}
      <button>⬇️</button>
      <button>💬{comment_count}</button>
    </div>
  );
}
