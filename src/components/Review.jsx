import React, { useEffect, useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import { getReviewsById } from "../api/api";
import CommentSection from "./CommentSection";
import Loading from "./loading/Loading";
import ReviewCard from "./ReviewCard";
import "../style/Review.css";
import Error from "./Error";

export default function Review() {
  const [singleReview, setSingleReview] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  const [errorState, setErrorState] = useState(null);
  const [err, setErr] = useState(null);

  const { review_id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getReviewsById(review_id)
      .then((review) => {
        setSingleReview(review);
        setIsLoading(false);
      })
      .catch((err) => {
        setErrorState({ err });
        setIsLoading(false);
      });
  }, [review_id]);

  if (err) return <p>{err}</p>; //this is for optimistice rendering
  if (errorState) return <Error></Error>; //this is for non existant path

  return isLoading ? (
    <Loading></Loading>
  ) : (
    <div>
      <ReviewCard
        review={singleReview}
        setErr={setErr}
        showButtons={true}
      ></ReviewCard>
      <p className="review-body">{singleReview.review_body}</p>
      <Routes>
        <Route
          path="comments"
          element={<CommentSection review_id={review_id}></CommentSection>}
        ></Route>
      </Routes>
    </div>
  );
}
