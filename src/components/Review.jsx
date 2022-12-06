import React, { useEffect, useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import { getReviewsById } from "../api/api";
import CommentSection from "./CommentSection";
import ReviewCard from "./ReviewCard";

export default function Review() {
  const [singleReview, setSingleReview] = useState({});

  const { review_id } = useParams();

  useEffect(() => {
    getReviewsById(review_id).then((review) => {
      setSingleReview(review);
    });
  }, [review_id]);

  return (
    <div>
      <ReviewCard review={singleReview}></ReviewCard>
      <p>{singleReview.review_body}</p>
      <Routes>
        <Route
          path="comments"
          element={<CommentSection review_id={review_id}></CommentSection>}
        ></Route>
      </Routes>
    </div>
  );
}
