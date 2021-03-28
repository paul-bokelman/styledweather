import axios from "axios";
import _ from "underscore";
const key = "25a4dc68b6974dde8af192821212203";

export const getData = async (q) => {
  const calcTempLength = (tempF, tempC) => {
    const tempLength = [];
    tempLength.push(tempF.length, tempC.length);
    console.log("tempLength", tempLength);
    return tempLength;
  };
  const relativeCondition = (code, isDay) => {
    //# USE ELSE
    if (code === 1000) {
      if (isDay === 1) {
        return "Sunny";
      }
      return "Clear";
    }
    if (code === 1003) {
      return "Partly Cloudy";
    }
    if (_.contains([1006, 1009, 1063, 1135], code)) {
      return "Cloudy";
    }
    if (
      _.contains(
        [
          1030,
          1150,
          1153,
          1180,
          1183,
          1186,
          1189,
          1192,
          1195,
          1240,
          1243,
          1246,
        ],
        code
      )
    ) {
      return "Rainy";
    }
    if (
      _.contains(
        [
          1066,
          1069,
          1072,
          1114,
          1117,
          1147,
          1168,
          1171,
          1198,
          1201,
          1204,
          1207,
          1210,
          1213,
          1216,
          1219,
          1222,
          1225,
          1237,
          1249,
          1252,
          1255,
          1258,
          1261,
          1264,
        ],
        code
      )
    ) {
      return "Snowy";
    }
    if (_.contains([1087, 1273, 1276, 1279, 1282], code)) {
      return "Thunder";
    }
  };

  const calculateBgSize = (name) => {
    if (name.length <= 9) {
      console.log(name.length, "18.5");
      return "18.5";
    } else if (name.length === 10) {
      console.log(name.length, "17");
      return "17";
    } else if (name.length >= 12) {
      console.log(name.length, "14.5");
      return "14.5";
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

  const url = `http://api.weatherapi.com/v1/current.json?q=${q}`;
  const data = await axios
    .get(url, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json",
        key,
      },
    })
    .then((response) => {
      const data = response.data;
      const isDay = data.current.is_day;
      const conditionCode = data.current.condition.code;
      const condition = relativeCondition(conditionCode, isDay);
      console.log(
        conditionCode,
        condition,
        isDay,
        isDay === 0 ? "night" : "day"
      );
      const dateTime = data.location.localtime;
      const date = splitString(dateTime, 0).replace(/-/g, ".");
      const time = splitString(dateTime, 1);
      const tempF = data.current.temp_f.toString().split(".")[0];
      const tempC = data.current.temp_c.toString().split(".")[0];
      const name = data.location.name;
      const bgSize = calculateBgSize(name);
      const tempLength = calcTempLength(tempF, tempC);

      return {
        info: {
          name,
          time,
          date,
        },
        current: {
          isDay,
          condition,
          tempF,
          tempC,
        },
        calc: {
          bgSize,
          tempLength,
        },
      };
    });
  return data;
};
