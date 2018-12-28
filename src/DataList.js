import React from "react";

const DataList = props => {
  return (
    <div className="DataList">
      <p>{props.data.location}</p>
      <p>{props.data.description}</p>
      <p>{props.data.temp}</p>
      <p>{props.data.wind}</p>
      <p>{props.data.sunrise}</p>
      <p>{props.data.sunset}</p>
    </div>
  );
};

export default DataList;
