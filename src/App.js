import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Context } from "./components/Context";
import "./scss/App.scss";
import "./scss/scene.scss";
import firebase from "./components/firebase";
import { handleSignup, handleSignin } from "./components/FirebaseFunctions"; //# firebase functions
import { getData } from "./components/getData"; //# api data
import { Clear, ClearN } from "./components/scenes/SceneImports";
function App() {
  // const [user, setUser] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [loggingIn, setLoggingIn] = useState(false);
  // const [error, setError] = useState("");
  const [locationInfo, setLocationInfo] = useState("");
  const [condition, setCondition] = useState("");
  const [tempF, setTempF] = useState("");
  const [tempC, setTempC] = useState("");
  const [isDay, setIsDay] = useState("");
  const [mainCondition, setMainCondition] = useState("");

  const weatherData = {
    locationInfo,
    condition,
    tempF,
    tempC,
  };

  // const splitString = (string, num) => {
  //   const split = string.split(" ");
  //   const splitRes = split[num];
  //   if (num === 0) {
  //     return splitRes;
  //   } else {
  //     if (splitRes.length === 4) {
  //       const zero = "0";
  //       return zero.concat(splitRes);
  //     } else {
  //       return splitRes;
  //     }
  //   }
  // };

  // const q = "Rhode Island"; // query for api

  // useEffect(() => {
  //   console.log(
  //     getData(q).then((data) => {
  //       console.log(data);
  //       const dateTime = data.location.localtime;
  //       const date = splitString(dateTime, 0).replace(/-/g, ".");
  //       const time = splitString(dateTime, 1);
  //       const tempF = data.current.temp_f.toString().split(".")[0];
  //       const tempC = data.current.temp_c.toString().split(".")[0];
  //       const isDay = data.current.is_day;
  //       setLocationInfo({ name: data.location.name, date, time });
  //       setCondition(data.current.condition.text);
  //       setTempF(tempF);
  //       setTempC(tempC);
  //     })
  //   );
  // }, []);

  return (
    <div className="App">
      <Context.Provider value={{ firebase, weatherData }}>
        <ClearN />
        {/* <h1>login system</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (loggingIn === false) {
              handleSignup(email, password);
            } else {
              handleSignin(email, password);
              setUser(firebase.auth().currentUser);
            }
          }}
        >
          <label>
            Name: <br />
            <input
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
          </label>
          <br />
          <label>
            Password: <br />
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
          </label>
          <br />
          {error !== "" ? <p className="err">{error}</p> : null}
          <input type="submit" value={loggingIn ? "Login" : "Signup"} />
          <p>
            {loggingIn ? "Don't have an account?" : "Already have an account?"}
            <span onClick={() => setLoggingIn(!loggingIn)}>
              {loggingIn ? " Create an account." : " Login."}
            </span>
          </p>
        </form>
        {user !== null ? (
          <h2>
            current user: email: {user.email}, uid: {user.uid}
          </h2>
        ) : null} */}
      </Context.Provider>
    </div>
  );
}

export default App;
