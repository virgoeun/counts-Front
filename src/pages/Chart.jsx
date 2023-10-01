import axios from "axios";
//import { LineChart, Line, Tooltip } from "recharts";
import React, { useEffect, useState } from "react";

export default function Chart() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [waterData, setWaterData] = useState({});
  const [stressData, setStressData] = useState({});
  const [sportsDurationData, setSportsDurationData] = useState({});

  const API_URL = "http://localhost:5005";

  const getActivity = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");
    console.log("StoredToken", storedToken);

    // Send the token through the request "Authorization" Headers
    axios
      .get(`${API_URL}/api/checkin`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setItems(response.data);

        // Extract water, stress, and sports duration data along with date
        const waterData = [];
        const stressData = [];
   const sportsDurationData=[];
    
        console.log("waterData", waterData);
        console.log("stressData", stressData);
        console.log("sportsData", sportsDurationData);

        response.data.forEach((item) => {
          const date = item.date.split("T")[0];
          console.log("Date:", date)

          // Aggregate water data for the same day
          if (item.water) {
            if (waterData[date]) {
              waterData[date] += parseInt(item.water);
            } else {
              waterData[date] = parseInt(item.water);
            }
          }

          // Aggregate stress data for the same day
          if (item.stress) {
            if (stressData[date]) {
              // You may need to implement logic to combine stress values properly
              // This is just a simple example
              stressData[date] += item.stress;
            } else { // if not exsits - means this is the 1st entry
              stressData[date] = item.stress;
            }
          }

          // Aggregate sports duration data for the same day
          if (item.sports) {
            item.sports.forEach((sport) => {
              if (sport.durationInMinutes) {
                if (sportsDurationData[date]) {
                  sportsDurationData[date] += parseInt(sport.durationInMinutes);
                } else {
                  sportsDurationData[date] = parseInt(sport.durationInMinutes);
                }
              }
            });
          }

          
        });

        setWaterData(waterData);
        setStressData(stressData);
        setSportsDurationData(sportsDurationData);

        console.log("Sports Duration Data:", sportsDurationData);


        setIsLoaded(true);
      })
      .catch((error) => {
        setIsLoaded(true);
        setError(error);
      });
  };

  useEffect(() => {
    getActivity();
  }, []);

  return (
    <div>
      {isLoaded ? (
        <>
          {/* Render your charts or display data as needed */}
          <div>
            <h2>Water Data</h2>
            <ul>
              {Object.keys(waterData).map((date) => (
                <li key={date}>
                  Date: {date}, Value: {waterData[date]}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Stress Level Data</h2>
            <ul>
              {Object.keys(stressData).map((date) => (
                <li key={date}>
                  Date: {date}, Value: {stressData[date]}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Sports Duration Data</h2>
            <ul>
              {Object.keys(sportsDurationData).map((date) => (
                <li key={date}>
                  Date: {date}, Duration: {sportsDurationData[date]}
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}

// import React from 'react';
// import { useEffect, useState } from "react";
// import { LineChart, Line } from 'recharts';

// export default function Chart() {
// const [error, setError] = useState(null);
// const [isLoaded, setIsLoaded] = useState(false);
// const [items, setItems] = useState([]);
// const data = [];

// const API_URL = "http://localhost:5005";

// useEffect(() => {
// fetch("https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=IBM&apikey=" + "VNXSEST4EE5ATS25")
// .then(res => res.json())
// .then(
// (result) => {
// for (var instance in result["Weekly Time Series"] ) {
// var mydata = (result["Weekly Time Series"][instance])
// mydata.date= instance
// data.push(mydata)
// }
// setItems(data.reverse())
// },
// Note: it's important to handle errors here
// instead of a catch() block so that we don't swallow
// exceptions from actual bugs in components.
// (error) => {
// setIsLoaded(true);
// setError(error);
// }
// )
// }, [])
// return (
// <div>
// <LineChart width={500} height={250} margin={{ top: 150, right: 30, left: 20, bottom: 5 }} data={items}>
// <Line dot={false}  type="monotone" dataKey="1. open" stroke="rgb(0,200,5)" yAxisId="100" />
// </LineChart>
// </div>
// )
// }
