import React, { useContext, useEffect, useState } from "react";
import { getUsers } from "../api/api";
import { LoggedInAs } from "../context/LoggedInAs";

export default function Login() {
  const { setLoggedInAs } = useContext(LoggedInAs);
  const [allUsers, setAllUsers] = useState([]);

  function handleClickUser(user) {
    setLoggedInAs(user);
  }

  useEffect(() => {
    getUsers().then((users) => {
      setAllUsers(users);
    });
  }, []);

  return (
    <div className="allusers-container">
      {allUsers.map((user) => {
        const { username, name, avatar_url } = user;

        return (
          <button
            onClick={() => {
              handleClickUser(user);
            }}
            key={username}
          >
            <div className="allusers-item">
              <img src={avatar_url} alt={name} className="avatar"></img>
              <h2 className="name">{name}</h2>
              <p className="username">{username}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
