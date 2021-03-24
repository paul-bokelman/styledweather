import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Context } from "../Context";
import { Helmet } from "react-helmet";
import lottie from "lottie-web";
import clearN from "../../lottie/clearN.json";

export const ClearN = () => {
  const [bgTextSize, setBGTextSize] = useState("20.5");
  const [F, setF] = useState(true);
  const { weatherData } = useContext(Context);

  const container = useRef(null);
  //   setInterval(function() {
  //      USE FOR TIME
  // }, 60 * 1000);

  const calculateBgSize = useCallback(() => {
    if (weatherData.locationInfo.name !== undefined) {
      console.log(weatherData.locationInfo.name);
      const name = weatherData.locationInfo.name;
      console.log(name.length);
      if (name.length <= 9) {
        setBGTextSize("18.5");
      } else if (name.length === 10) {
        setBGTextSize("17");
      } else if (name.length >= 12) {
        setBGTextSize("14.5");
      }
    }
  }, [weatherData]);

  useEffect(() => {
    calculateBgSize();
  }, [calculateBgSize, weatherData]);

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current, // the dom element that will contain the animation
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: clearN, // the path to the animation json
    });
  }, []);

  return (
    <div>
      <Helmet>
        <html data-theme="night" />
      </Helmet>
      <div className="clearN" ref={container}></div>
      {weatherData.tempC !== "" ? (
        <>
          <div className="clearNbackgroundText">
            <h2 style={{ fontSize: `${bgTextSize}vw` }} className="noselect">
              {weatherData.locationInfo.name}
            </h2>
          </div>

          <div className="clearNCondition">
            <h2>Clear</h2>
            <ul>
              <li className="item time">{weatherData.locationInfo.time}</li>
              <li className="item date">{weatherData.locationInfo.date}</li>
            </ul>
          </div>

          <div className="clearNTemp">
            <h2>
              {F ? `${weatherData.tempF}` : `${weatherData.tempC}`}{" "}
              <span onClick={() => setF(!F)}>{F ? "°F" : "°C"}</span>
            </h2>
          </div>

          {/* <h2>tempC: {weatherData.tempC} °C</h2> */}
        </>
      ) : (
        <>
          <div className="clearNbackgroundText">
            <h2 style={{ fontSize: `20.5vw` }} className="noselect">
              New York
            </h2>
          </div>

          <div className="clearNCondition ">
            <h2>Clear</h2>
            <ul>
              <li className="item time">01:23</li>
              <li className="item date">3.23.21</li>
            </ul>
          </div>

          <div className="clearNTemp">
            <h2>
              72 <span>°F</span>
            </h2>
          </div>
        </>
      )}
    </div>
  );
};
