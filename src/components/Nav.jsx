import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LoggedInAs } from "../context/LoggedInAs";

export default function Nav() {
  const { loggedInAs } = useContext(LoggedInAs);
  const { username } = loggedInAs;
  // { name, avatar_url} can be deconstructed from here
  return (
    <div className="nav-container">
      <Link to="/">Home</Link>
      {username}
    </div>
  );
}
