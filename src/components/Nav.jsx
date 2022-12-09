import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCategories } from "../api/api";
import { LoggedInAs } from "../context/LoggedInAs";
import { SelectedCategory } from "../context/SelectedCategory";
import "../style/Nav.css";

export default function Nav() {
  const { loggedInAs } = useContext(LoggedInAs);
  const {
    categoriesState,
    setCategoriesState,
    selectedCategory,
    setSelectedCategory,
  } = useContext(SelectedCategory);
  const { username } = loggedInAs;
  // { name, avatar_url} can be deconstructed from here

  const navigate = useNavigate();

  function handleCategoryChange(event) {
    event === "All Categories"
      ? setSelectedCategory("")
      : setSelectedCategory(event);

    navigate(`categories/${event}`);
  }

  useEffect(() => {
    getCategories().then((categories) => {
      setCategoriesState(categories);
    });
  }, [setCategoriesState]);

  return (
    <div className="nav-container">
      <Link to="/">Home</Link>

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

      {username}
    </div>
  );
}
