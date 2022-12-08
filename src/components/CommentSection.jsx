import React, { useContext, useEffect, useState } from "react";
import {
  deleteCommentsById,
  getCommentsByReviewId,
  postCommentsById,
} from "../api/api";
import "../style/CommenSection.css";
import { LoggedInAs } from "../context/LoggedInAs";
import { TextField } from "@mui/material";
import Loading from "./loading/Loading";

export default function CommentSection({ review_id }) {
  const [comments, setComments] = useState([]);
  const [currentCommentInput, setCurrentCommentInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [textFieldError, setTextFieldError] = useState(false);
  const [helperTextState, setHelperTextState] = useState("");

  useEffect(() => {
    setIsLoading(true);
    getCommentsByReviewId(review_id).then((response) => {
      setComments(response);
      setIsLoading(false);
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

  function handleDeleteClick(comment_id) {
    setComments((current) => {
      const updatedComments = current.filter(
        (comment) => comment.comment_id !== comment_id
      );
      return updatedComments;
    });
    deleteCommentsById(comment_id);
  }

  return isLoading ? (
    <Loading></Loading>
  ) : (
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
            multiline
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
            <div className="comment-card-bottom">
              <p>{votes} Votes</p>
              {author === loggedInAs.username ? (
                <button
                  onClick={() => {
                    handleDeleteClick(comment_id);
                  }}
                >
                  ❎
                </button>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}
