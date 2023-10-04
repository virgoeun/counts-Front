import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import styles for date picker

import CustomTooltip from "../components/Charts/CustomToolTip";

export default function Chart() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  //const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [waterData, setWaterData] = useState([]);
  const [sportsDurationData, setSportsDurationData] = useState([]);
  const [sleepData, setSleepData] = useState([]);

  const [waterFilteredData, setWaterFilteredData] = useState([]);
  const [sleepFilteredData, setSleepFilteredData] = useState([]);
  const [sportsFilteredData, setSportsFilteredData] = useState({});

  const API_URL = "http://localhost:5005";

  // this one works only for ARRAY! (not object -> that's why sports data should be turned into ARRAY: check the below "sportsDurationChartData" function)
  const filterDataByDateRange = (data, startDate, endDate) => {
    return data.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= startDate && itemDate <= endDate;
    });
  };

  const getActivity = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/api/checkin`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const data = response.data;

        // Extract water data
        const waterDataRetrieved = data.map((item) => ({
          date: item.date.split("T")[0],
          water: item.water ? parseInt(item.water) : 0,
        }));

        // Extract sports duration data and aggregate it
        const sportsDurationDataRetrieved = data.reduce((accumulator, item) => {
          const date = item.date.split("T")[0];

          if (item.sports) {
            item.sports.forEach((sport) => {
              if (sport.durationInMinutes) {
                const minutes = sport.durationInMinutes;

                if (accumulator[date]) {
                  accumulator[date] += minutes;
                } else {
                  accumulator[date] = minutes;
                }
              }
            });
          }

          return accumulator;
        }, {});

        // Extract sleep data
        const sleepDataRetrieved = data.map((item) => ({
          date: item.date.split("T")[0],
          sleep: item.sleep ? parseFloat(item.sleep) : 0,
        }));

        // Convert sports duration data to an array and format hours with one decimal place
        const sportsDurationChartData = Object.keys(
          sportsDurationDataRetrieved
        ).map((date) => ({
          date,
          minutes: sportsDurationDataRetrieved[date],
        }));
        console.log("sports OBJECT", sportsDurationDataRetrieved);
        console.log("sports ARRAY", sportsDurationChartData);

        setWaterData(waterDataRetrieved);
        setSportsDurationData(sportsDurationChartData);
        setSleepData(sleepDataRetrieved);
        setIsLoaded(true);
      })
      .catch((error) => {
        setIsLoaded(true);
        setError(error);
      });
  };

  const handleRetrieveData = () => {
    // Call getActivity to retrieve and set data
    getActivity();
  };

  useEffect(() => {
    // Filter data when startDate or endDate change
    const filteredWaterData = filterDataByDateRange(
      waterData,
      startDate,
      endDate
    );
    setWaterFilteredData(filteredWaterData);

    const filteredSleepData = filterDataByDateRange(
      sleepData,
      startDate,
      endDate
    );
    setSleepFilteredData(filteredSleepData);

    const filteredSportsData = filterDataByDateRange(
      sportsDurationData,
      startDate,
      endDate
    );
    setSportsFilteredData(filteredSportsData);
  }, [startDate, endDate, sleepData, waterData, sportsDurationData]);

  return (
    <div>
      {/* Calendar Day-Picker */}
      <div>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Start Date"
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          placeholderText="End Date"
        />
        <button onClick={handleRetrieveData}>Retrieve Data</button>
      </div>

      {/* Display Filtered Data */}
      {isLoaded ? (
        <>
          {/* Water Consumption Chart */}
          <div>
            <h2>Water Consumption Chart</h2>
            <LineChart
              width={800}
              height={400}
              data={waterFilteredData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid stroke="none" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="water"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </div>

          {/* Sports Duration Chart */}
          <div>
            <h2>Sports Duration Chart (minutes)</h2>
            <LineChart width={600} height={300} data={sportsFilteredData}>
              <CartesianGrid stroke="none" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="minutes"
                name="Sports Duration (minutes)"
                stroke="#82ca9d"
              />
            </LineChart>
          </div>

          {/* Sleep Chart */}
          <div>
            <h2>Sleep Chart</h2>
            <LineChart width={600} height={300} data={sleepFilteredData}>
              <CartesianGrid stroke="none" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="sleep"
                name="Sleep (hours)"
                stroke="#ff0000" // Choose an appropriate color
              />
            </LineChart>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}