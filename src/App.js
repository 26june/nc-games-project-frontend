import { useState } from "react";
import "./App.css";
import Main from "./components/_Main";
import Login from "./components/_Login";
import { LoggedInAs } from "./context/LoggedInAs";

function App() {
  const [loggedInAs, setLoggedInAs] = useState(null);

  return (
    <LoggedInAs.Provider value={{ loggedInAs, setLoggedInAs }}>
      <div className="App">{loggedInAs ? <Main></Main> : <Login></Login>}</div>
    </LoggedInAs.Provider>
  );
}

export default App;
