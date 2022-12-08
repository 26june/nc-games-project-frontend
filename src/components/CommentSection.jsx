import React, { useContext, useEffect, useState } from "react";
import { getCommentsByReviewId, postCommentsById } from "../api/api";
import "../style/CommenSection.css";
import { LoggedInAs } from "../context/LoggedInAs";
import { TextField } from "@mui/material";

export default function CommentSection({ review_id }) {
  const [comments, setComments] = useState([]);
  const [currentCommentInput, setCurrentCommentInput] = useState("");

  const [textFieldError, setTextFieldError] = useState(false);
  const [helperTextState, setHelperTextState] = useState("");

  useEffect(() => {
    getCommentsByReviewId(review_id).then((response) => {
      setComments(response);
    });
  }, [review_id]);
  const { loggedInAs } = useContext(LoggedInAs);

  function handleSubmit(event) {
    event.preventDefault();
    if (!currentCommentInput) {
      setTextFieldError(true);
      setHelperTextState("Please add a comment body");
    }
    //requires form validation

    postCommentsById(review_id, loggedInAs.username, currentCommentInput).then(
      (response) => {
        setComments((current) => {
          return [response, ...current]; //this makes the new comment show up at the top
          //but when refreshed it will end up at the bottom
        });
        setCurrentCommentInput("");
      }
    );
  }

  return (
    <div className="comment-section">
      <form
        className="comment-form"
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <div>
          <label htmlFor="comment-field">Add a comment</label>
          <TextField
            id="comment-field"
            autoComplete="off"
            onChange={(event) => {
              setCurrentCommentInput(event.target.value);
              setTextFieldError(false);
              setHelperTextState("");
            }}
            helperText={helperTextState}
            value={currentCommentInput}
            error={textFieldError}
          ></TextField>
        </div>
        <button type="submit">Add Comment</button>
      </form>

      {comments.map(({ comment_id, body, author, votes, created_at }) => {
        return (
          <div className="comment-card" key={comment_id}>
            <div className="comment-card-info">
              <p>{author}</p>
              <p>{created_at}</p>
            </div>
            <p>{body}</p>
            <p>{votes} Votes</p>
          </div>
        );
      })}
    </div>
  );
}
