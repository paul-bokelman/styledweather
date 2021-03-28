import React, { useEffect, useState } from "react";
import { Context } from "./components/Context";
import "./scss/App.scss";
import "./scss/scene.scss";
import { getData } from "./components/getData"; //# api data
import {
  Clear,
  ClearN,
  PartlyCloudy,
  PartlyCloudyN,
  Cloudy,
  CloudyN,
} from "./components/scenes/SceneImports";
function App() {
  const [user, setUser] = useState("");
  const [locationInfo, setLocationInfo] = useState("");
  const [condition, setCondition] = useState("Clear");
  const [tempF, setTempF] = useState("");
  const [tempC, setTempC] = useState("");
  const [isDay, setIsDay] = useState(1);
  const [bgTextSize, setBGTextSize] = useState("20.5");
  const [tempLength, setTempLength] = useState([]);

  const renderTemplate = () => {
    if (condition === "Sunny") {
      return <Clear />;
    }
    if (condition === "Clear") {
      return <ClearN />;
    }
    if (condition === "Partly Cloudy") {
      if (isDay === 1) {
        return <PartlyCloudy />;
      }
      return <PartlyCloudyN />;
    }
  };

  const weatherData = {
    locationInfo,
    condition,
    tempF,
    tempC,
  };

  // const q = "San Diego"; // query for api

  // useEffect(() => {
  //   getData(q).then((r) => {
  //     setLocationInfo({
  //       name: r.info.name,
  //       date: r.info.date,
  //       time: r.info.time,
  //     });
  //     setCondition(r.current.condition);
  //     setTempF(r.current.tempF);
  //     setTempC(r.current.tempC);
  //     setIsDay(r.current.isDay);
  //     setBGTextSize(r.calc.bgSize);
  //     setTempLength(r.calc.tempLength);
  //     console.log(r);
  //   });
  // }, []);

  //# STRING CHECK FOR TEMP
  return (
    <div className="App">
      <Context.Provider
        value={{ user, setUser, weatherData, bgTextSize, tempLength }}
      >
        {/* {condition && isDay !== "" ? renderTemplate() : <h1>waiting</h1>} */}
        <PartlyCloudy />
      </Context.Provider>
    </div>
  );
}

export default App;
