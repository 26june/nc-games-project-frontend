import React, { useContext } from "react";
import { LoggedInAs } from "../context/LoggedInAs";

export default function Nav() {
  const { loggedInAs } = useContext(LoggedInAs);
  const { username, name, avatar_url } = loggedInAs;
  return <div className="nav-container">{username}</div>;
}
