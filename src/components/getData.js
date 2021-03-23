import axios from "axios";
const key = "25a4dc68b6974dde8af192821212203";
export const getData = () => {
  const url = "http://api.weatherapi.com/v1/current.json?q=London";
  axios
    .get(url, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json",
        key,
      },
    })
    .then((response) => {
      console.log(response.data.location);
      console.log(response.data.current);
    });
};
