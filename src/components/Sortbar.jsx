import React, { useContext, useEffect } from "react";
import "../style/SortBar.css";
import { SelectedCategory } from "../context/SelectedCategory";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../api/api";

export default function Sortbar({ currentSearch, setCurrentSearch }) {
  const selection = {
    toSort: ["votes", "created_at", "comment_count"],
    order_by: ["desc", "asc"],
  };
  const navigate = useNavigate();

  const {
    categoriesState,
    setCategoriesState,
    selectedCategory,
    setSelectedCategory,
  } = useContext(SelectedCategory);

  function handleCategoryChange(event) {
    event === "All Categories"
      ? setSelectedCategory("")
      : setSelectedCategory(event);
    navigate(`/categories/${event}`);
  }

  useEffect(() => {
    getCategories().then((categories) => {
      setCategoriesState(categories);
    });
  }, [setCategoriesState]);

  return (
    <div className="Sortbar">
      <div>
        <div>
          <label htmlFor="categories">Select a Category</label>
          <select
            name="categories"
            id="categories"
            onChange={(event) => {
              handleCategoryChange(event.target.value);
            }}
            value={selectedCategory}
          >
            <option>All Categories</option>
            {categoriesState.map((category) => {
              return (
                <option key={category.slug} value={category.slug}>
                  {category.slug}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="toSort">Sort by</label>
        <select
          name="sortBy"
          id="sortBy"
          onChange={(event) => {
            currentSearch.set("sort_by", event.target.value);
            setCurrentSearch(currentSearch);
          }}
          value={
            currentSearch.get("sort_by")
              ? currentSearch.get("sort_by")
              : "votes"
          }
        >
          {selection.toSort.map((option) => {
            return (
              <option key={option} value={option}>
                {option}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <label htmlFor="sortBy">Order:</label>
        <select
          name="sortBy"
          id="sortBy"
          onChange={(event) => {
            currentSearch.set("order_by", event.target.value);
            setCurrentSearch(currentSearch);
          }}
          value={
            currentSearch.get("order_by")
              ? currentSearch.get("order_by")
              : "desc"
          }
        >
          {selection.order_by.map((option) => {
            return (
              <option key={option} value={option}>
                {option}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}
