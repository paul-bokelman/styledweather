import axios from "axios";
const key = "25a4dc68b6974dde8af192821212203";

export const getData = async (q) => {
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
      //   console.log(response.data.location);
      //   console.log(response.data.current);
      return response.data;
    });
  return data;
};
