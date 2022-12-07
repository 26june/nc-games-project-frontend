import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCategories } from "../api/api";
import { LoggedInAs } from "../context/LoggedInAs";
import "../style/Nav.css";

export default function Nav({ setSelectedCategory }) {
  const [categoriesState, setCategoriesState] = useState([]);
  const { loggedInAs } = useContext(LoggedInAs);
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
  }, []);

  return (
    <div className="nav-container">
      <Link to="/">Home</Link>

      <label htmlFor="categories">Select a Category</label>
      <select
        name="categories"
        id="categories"
        onChange={(event) => {
          handleCategoryChange(event.target.value);
        }}
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
      {username}
    </div>
  );
}
