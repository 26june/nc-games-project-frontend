import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LoggedInAs } from "../context/LoggedInAs";
import "../style/Nav.css";

export default function Nav() {
  const { loggedInAs } = useContext(LoggedInAs);
  const { username } = loggedInAs;
  // { name, avatar_url} can be deconstructed from here
  return (
    <div className="nav-container">
      <Link to="/">Home</Link>

      <label for="categories">Select a Category</label>
      <select name="categories" id="categories">
        <option>All Categories</option>
        <option>dexterity</option>
      </select>
      {username}
    </div>
  );
}
