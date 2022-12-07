import React, { useContext, useEffect, useState } from "react";
import { getCommentsByReviewId, postCommentsById } from "../api/api";
import "../style/CommenSection.css";
import { LoggedInAs } from "../context/LoggedInAs";

export default function CommentSection({ review_id }) {
  const [comments, setComments] = useState([]);
  const [currentCommentInput, setCurrentCommentInput] = useState("");

  useEffect(() => {
    getCommentsByReviewId(review_id).then((response) => {
      setComments(response);
    });
  }, [review_id]);
  const { loggedInAs } = useContext(LoggedInAs);

  function handleSubmit(event) {
    event.preventDefault();
    postCommentsById(review_id, loggedInAs.username, currentCommentInput).then(
      () => {
        setCurrentCommentInput("");
      }
    );
  }

  return (
    <div>
      <form
        className="comment-form"
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <label htmlFor="comment-field">Add a comment</label>
        <input
          type="text"
          autoComplete="off"
          id="comment-field"
          onChange={(event) => {
            setCurrentCommentInput(event.target.value);
          }}
          value={currentCommentInput}
        />
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
