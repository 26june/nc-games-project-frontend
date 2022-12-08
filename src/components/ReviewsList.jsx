import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getReviews } from "../api/api";
import ReviewCard from "./ReviewCard";
import Loading from "./loading/Loading";
import { SelectedCategory } from "../context/SelectedCategory";
import Sortbar from "./Sortbar";

export default function ReviewsList({ category = "" }) {
  const [reviewsState, setReviewsState] = useState([]);

  const { setSelectedCategory } = useContext(SelectedCategory);

  let navigate = useNavigate();
  function reviewListClick(review_id) {
    navigate(`/reviews/${review_id}`);
  }

  const [isLoading, setIsLoading] = useState(true);

  const [currentSearch, setCurrentSearch] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    const sort_by = currentSearch.get("sort_by") || undefined; //dont set to null
    const order_by = currentSearch.get("order_by") || undefined; //if set to null the defaults dont kick in
    setSelectedCategory(category);
    getReviews(category, sort_by, order_by).then((reviews) => {
      setReviewsState(reviews);
      setIsLoading(false);
    });
  }, [category, setSelectedCategory, currentSearch]);

  return isLoading ? (
    <Loading></Loading>
  ) : (
    <div>
      <Sortbar
        currentSearch={currentSearch}
        setCurrentSearch={setCurrentSearch}
      ></Sortbar>

      <div className="reviews-list-container">
        {reviewsState.map((review) => {
          return (
            <div
              key={review.review_id}
              onClick={() => {
                reviewListClick(review.review_id);
              }}
            >
              <ReviewCard review={review} showButtons={false}></ReviewCard>
            </div>
          );
        })}
      </div>
    </div>
  );
}
