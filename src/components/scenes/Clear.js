import React, { useContext } from "react";
import { Context } from "../Context";

export const Clear = () => {
  const { weatherData } = useContext(Context);
  return (
    <div>
      <h1>Clear</h1>
    </div>
  );
};
