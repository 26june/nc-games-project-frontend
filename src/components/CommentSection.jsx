import React, { useEffect, useState } from "react";
import { getCommentsByReviewId } from "../api/api";

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
            <p>{body}</p>
            <p>{author}</p>
            <p>{votes}</p>
            <p>{created_at}</p>
          </div>
        );
      })}
    </div>
  );
}
