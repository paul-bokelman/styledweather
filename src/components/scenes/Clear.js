import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import { Context } from "../Context";
import { Helmet } from "react-helmet";
import lottie from "lottie-web";
import clear from "../../lottie/clear.json";

export const Clear = () => {
  const { weatherData, bgTextSize, tempLength } = useContext(Context);
  const [timeTop, setTimeTop] = useState("01");
  const [timeBottom, setTimeBottom] = useState("22");
  const [F, setF] = useState(true);
  const [lengthIndex, setLengthIndex] = useState(0);

  const container = useRef(null);

  const timeConvert = (timeString) => {
    const splitString = timeString.split(":");
    setTimeTop(splitString[0]);
    setTimeBottom(splitString[1]);
  };

  const tempSwitch = () => {
    setF(!F);
    setLengthIndex((prev) => (prev + 1) % 2);
  };

  useEffect(() => {
    if (weatherData.locationInfo.time !== undefined) {
      timeConvert(weatherData.locationInfo.time);
    }
  }, [weatherData]);

  //# PARSE TIME INTO TOP AND BOTTOM REMOVE SEMICOLON
  useEffect(() => {
    lottie.loadAnimation({
      container: container.current, // the dom element that will contain the animation
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: clear, // the path to the animation json
    });
  }, []);
  return (
    <div className="clear">
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
          </div>
          <div className="timeDate">
            <h1 className="top">{timeTop}</h1>
            <h1>{timeBottom}</h1>
            <h3>{weatherData.locationInfo.date}</h3>
          </div>

          <div className="temp noselect">
            {tempLength.length !== 0 ? (
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
              </h2>
            ) : null}
          </div>

          {/* <h2>tempC: {weatherData.tempC} °C</h2> */}
        </>
      ) : (
        <>
          <div className="backgroundText bgTxt">
            <h2 style={{ fontSize: `20.5vw` }} className="noselect">
              Chicago
            </h2>
          </div>

          <div className="condition">
            <h2>Clear</h2>
          </div>

          <div className="timeDate">
            <h1 className="top">{timeTop}</h1>
            <h1>{timeBottom}</h1>
            <h3>2021.03.25</h3>
          </div>

          <div className="temp">
            <h2 className="three">100</h2>
          </div>
        </>
      )}
    </div>
  );
};
