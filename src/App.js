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
  const [isDay, setIsDay] = useState(1);
  const [mainCondition, setMainCondition] = useState("");
  const [bgTextSize, setBGTextSize] = useState("20.5");
  const [tempLength, setTempLength] = useState([]);

  const weatherData = {
    locationInfo,
    condition,
    tempF,
    tempC,
  };

  const calcTempLength = (tempF, tempC) => {
    const tempLength = [];
    tempLength.push(tempF.length, tempC.length);
    console.log(tempLength);
    setTempLength(tempLength);
  };

  const calculateBgSize = (name) => {
    console.log(name.length);
    if (name.length <= 9) {
      setBGTextSize("18.5");
    } else if (name.length === 10) {
      setBGTextSize("17");
    } else if (name.length >= 12) {
      setBGTextSize("14.5");
    }
  };

  const splitString = (string, num) => {
    const split = string.split(" ");
    const splitRes = split[num];
    if (num === 0) {
      return splitRes;
    } else {
      if (splitRes.length === 4) {
        const zero = "0";
        return zero.concat(splitRes);
      } else {
        return splitRes;
      }
    }
  };

  const q = "San Diego"; // query for api

  useEffect(() => {
    console.log(
      getData(q).then((data) => {
        console.log(data);
        const dateTime = data.location.localtime;
        const date = splitString(dateTime, 0).replace(/-/g, ".");
        const time = splitString(dateTime, 1);
        const tempF = data.current.temp_f.toString().split(".")[0];
        const tempC = data.current.temp_c.toString().split(".")[0];
        const isDay = data.current.is_day;
        calculateBgSize(data.location.name);
        calcTempLength(tempF, tempC);
        setIsDay(isDay);
        setLocationInfo({ name: data.location.name, date, time });
        setCondition(data.current.condition.text);
        setTempF(tempF);
        setTempC(tempC);
      })
    );
  }, []);

  //# STRING CHECK FOR TEMP
  return (
    <div className="App">
      <Helmet>
        <html data-theme={isDay === 0 ? "night" : "day"} />
        {/* day, night, day-hazy */}
      </Helmet>
      <Context.Provider
        value={{ firebase, weatherData, bgTextSize, tempLength }}
      >
        {isDay === 0 ? <ClearN /> : <Clear />}
        {/* CHANGE 0 AND 1 */}
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
