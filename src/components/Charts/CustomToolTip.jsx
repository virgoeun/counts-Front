import React from "react";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const dataPoint = payload[0];
    const dataKey = payload[0].name;
    const value = payload[0].value;
    return (
      <div className="custom-tooltip">
        <p>{`Month: ${label}`}</p>
        <p>{`${dataKey}: ${value}`}</p>
        <p>{`Value: ${dataPoint.name}`}</p>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;