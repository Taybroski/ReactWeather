import React from "react";

const WeatherButton = props => (
  <div className="WeatherButton" onClick={props.onClick}>
    <h1 className="GetWeatherButton">Get Weather</h1>
  </div>
);

export default WeatherButton;
