import { Chip, IconButton } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { pathcReviewsById } from "../api/api";
import "../style/ReviewCard.css";
import {
  ArrowCircleDown,
  ArrowCircleDownTwoTone,
  ArrowCircleUp,
  ArrowCircleUpTwoTone,
} from "@mui/icons-material";

export default function ReviewCard({ review, setErr, showButtons }) {
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
  const [originalVotes] = useState(votes);

  const [disableUp, setDisableUp] = useState(false);
  const [disableDown, setDisableDown] = useState(false);

  let navigate = useNavigate();

  function handleCommentClick() {
    navigate(`/reviews/${review_id}/comments`);
  }

  function handleUpVoteClick(increment) {
    setVotesState(originalVotes + 1);
    setErr(null);
    pathcReviewsById(review_id, increment).catch((err) => {
      setVotesState((current) => originalVotes - increment);
      setErr("Something went wrong, please try again");
    });
  }

  function handleVoteClickTwice(VotesToReset) {
    setVotesState(originalVotes);
    setErr(null);
    pathcReviewsById(review_id, VotesToReset).catch((err) => {
      setVotesState((current) => current + VotesToReset);
      setErr("Something went wrong, please try again");
    });
  }

  function handleDownVoteClick(increment) {
    setVotesState(originalVotes - 1);
    setErr(null);
    pathcReviewsById(review_id, increment).catch((err) => {
      setVotesState((current) => originalVotes + increment);
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

          <Chip
            sx={{ width: "fit-content" }}
            icon={<CategoryIcon />}
            color="primary"
            label={category}
          />

          <h3>{designer}</h3>
          <p>{created_at}</p>
        </div>
      </div>

      {showButtons ? (
        <div className="reviewcard-buttons">
          <IconButton
            aria-label="upvote"
            size="small"
            onClick={() => {
              if (disableUp) {
                handleVoteClickTwice(-1);
                setDisableUp(false);
              } else {
                disableDown ? handleUpVoteClick(2) : handleUpVoteClick(1);
                setDisableUp(true);
                setDisableDown(false);
              }
            }}
          >
            {disableUp ? (
              <ArrowCircleUpTwoTone></ArrowCircleUpTwoTone>
            ) : (
              <ArrowCircleUp></ArrowCircleUp>
            )}
          </IconButton>
          {votesState}
          <IconButton
            aria-label="downvote"
            size="small"
            onClick={() => {
              if (disableDown) {
                handleVoteClickTwice(1);
                setDisableDown(false);
              } else {
                disableUp ? handleDownVoteClick(-2) : handleDownVoteClick(-1);
                setDisableUp(false);
                setDisableDown(true);
              }
            }}
          >
            {disableDown ? (
              <ArrowCircleDownTwoTone></ArrowCircleDownTwoTone>
            ) : (
              <ArrowCircleDown></ArrowCircleDown>
            )}
          </IconButton>

          <button onClick={handleCommentClick}>💬{comment_count}</button>
        </div>
      ) : (
        <p>
          {votes} Votes | {comment_count} Comments
        </p>
      )}
    </div>
  );
}
