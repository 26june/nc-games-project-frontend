import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LoggedInAs } from "../context/LoggedInAs";

export default function Nav() {
  const { loggedInAs } = useContext(LoggedInAs);
  const { username, name, avatar_url } = loggedInAs;
  return (
    <div className="nav-container">
      <Link to="/">Home</Link>
      {username}
    </div>
  );
}
