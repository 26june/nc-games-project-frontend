import React, { useEffect, useState } from "react";
import { getCommentsByReviewId } from "../api/api";
import "../style/CommenSection.css";

export default function CommentSection({ review_id }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getCommentsByReviewId(review_id).then((response) => {
      setComments(response);
    });
  }, [review_id]);

  return (
    <div>
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
