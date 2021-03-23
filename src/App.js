import React, { useEffect } from "react";
import { Context } from "./components/Context";
import "./App.css";
import firebase from "./components/firebase";
import { handleSignup, handleSignin } from "./components/FirebaseFunctions";
import { getData } from "./components/getData";
function App() {
  const email = "paul.bokelman1@gmail.com";
  const password = "password";
  useEffect(() => {
    getData();
  }, []);
  // const { accounts } = useContext(Context); //# other components
  return (
    <div className="App">
      <Context.Provider value={{ firebase }}>
        <button onClick={() => handleSignup(email, password)}>signup</button>
        <button onClick={() => handleSignin(email, password)}>signin</button>
        <h1>hi</h1>
      </Context.Provider>
    </div>
  );
}

export default App;
