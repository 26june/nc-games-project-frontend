import { useState } from "react";
import "./App.css";
import Main from "./components/_Main";
import Login from "./components/_Login";
import { LoggedInAs } from "./context/LoggedInAs";

function App() {
  const [loggedInAs, setLoggedInAs] = useState({
    username: "tickle122",
    name: "Tom Tickle",
    avatar_url:
      "https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953",
  });

  return (
    <LoggedInAs.Provider value={{ loggedInAs, setLoggedInAs }}>
      <div className="App">{loggedInAs ? <Main></Main> : <Login></Login>}</div>
    </LoggedInAs.Provider>
  );
}

export default App;
