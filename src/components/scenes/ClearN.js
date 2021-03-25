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
  const { weatherData, bgTextSize, tempLength } = useContext(Context);
  const container = useRef(null);
  const [F, setF] = useState(true);
  const [lengthIndex, setLengthIndex] = useState(0);

  const tempSwitch = () => {
    setF(!F);
    setLengthIndex((prev) => (prev + 1) % 2);
  };

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
    <div className="clearN">
      <div className="icon" ref={container}></div>
      {weatherData.tempC !== "" ? (
        <>
          <div className="backgroundText bgTxt">
            <h2 style={{ fontSize: `${bgTextSize}vw` }} className="noselect">
              {weatherData.locationInfo.name}
            </h2>
          </div>

          <div className="condition">
            <h2>Clear</h2>
            <ul>
              <li className="item time">{weatherData.locationInfo.time}</li>
              <li className="item date">{weatherData.locationInfo.date}</li>
            </ul>
          </div>

          <div className="temp">
            <h2
              onClick={tempSwitch}
              className={
                tempLength[lengthIndex] === 1
                  ? "one"
                  : tempLength[lengthIndex] === 2
                  ? "two"
                  : "three"
              }
            >
              {F ? `${weatherData.tempF}` : `${weatherData.tempC}`}
              <span onClick={tempSwitch}>{F ? "°F" : "°C"}</span>
            </h2>
          </div>

          {/* <h2>tempC: {weatherData.tempC} °C</h2> */}
        </>
      ) : (
        <>
          <div className="backgroundText bgTxt">
            <h2 style={{ fontSize: `20.5vw` }} className="noselect">
              New York
            </h2>
          </div>

          <div className="condition">
            <h2>Clear</h2>
            <ul>
              <li className="item time">01:23</li>
              <li className="item date">3.23.21</li>
            </ul>
          </div>

          <div className="temp">
            <h2 className="three">
              123 <span>°F</span>
            </h2>
          </div>
        </>
      )}
    </div>
  );
};
