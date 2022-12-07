import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { pathcReviewsById } from "../api/api";

export default function ReviewCard({ review, setErr }) {
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

  const [votesState, setVotesState] = useState(votes);

  let navigate = useNavigate();

  function handleCommentClick() {
    navigate(`/reviews/${review_id}/comments`);
  }

  function handleVoteClick(voteToIncrement) {
    setVotesState((current) => current + voteToIncrement);
    setErr(null);
    pathcReviewsById(review_id, voteToIncrement).catch((err) => {
      setVotesState((current) => current - voteToIncrement);
      setErr("Something went wrong, please try again");
    });
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
        <button
          onClick={() => {
            handleVoteClick(1);
          }}
        >
          ⬆️
        </button>
        {votesState}
        <button
          onClick={() => {
            handleVoteClick(-1);
          }}
        >
          ⬇️
        </button>

        <button onClick={handleCommentClick}>💬{comment_count}</button>
      </div>
    </div>
  );
}
