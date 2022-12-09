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
    availableCategories.length === 0 || //having || 0 here means that we cant go into no category at the start
    //when everything needs to be loaded
    //also skips NoCategory if there is a bad query and goes straight to Error400
    category === "All Categories" ? (
    <div>
      <ReviewsList category={category}></ReviewsList>
    </div>
  ) : (
    <NoCategory category={category}></NoCategory>
  );
}
