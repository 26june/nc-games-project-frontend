import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import ReviewsList from "./ReviewsList";
import { SelectedCategory } from "../context/SelectedCategory";
import NoCategory from "./NoCategory";

export default function CategorisedReview() {
  const { category } = useParams();

  const { categoriesState } = useContext(SelectedCategory);

  const availableCategories = categoriesState.map((category) => {
    return category.slug;
  });

  return availableCategories.includes(category) ||
    availableCategories.length === 0 ||
    category === "All Categories" ? (
    <div>
      <ReviewsList category={category}></ReviewsList>
    </div>
  ) : (
    <NoCategory category={category}></NoCategory>
  );
}
