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

import "bootstrap/dist/css/bootstrap.min.css";

import "../App.css"
// import classes from "../components/ChartGroup/graph.module.css";
import { Form, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import styles for date picker

import CustomTooltip from "../components/CustomToolTip/CustomToolTip";

export default function Chart() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [waterData, setWaterData] = useState([]);
  const [sportsDurationData, setSportsDurationData] = useState([]);
  const [sleepData, setSleepData] = useState([]);
  const [showChart, setShowChart] = useState(false);

  const [waterFilteredData, setWaterFilteredData] = useState([]);
  const [sleepFilteredData, setSleepFilteredData] = useState([]);
  const [sportsFilteredData, setSportsFilteredData] = useState({});

  const API_URL = "https://counts-back.onrender.com";

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
        //parses the item.water to an integer using parseInt. 
        //If item.water is a truthy value, it parses it as an integer

        // Extract sports duration data and aggregate it
        //because it's array (so neend to accumulate)++ or not(if no exisitng data...)
        const sportsDurationDataRetrieved = data.reduce((accumulator, item) => {
          const date = item.date.split("T")[0];

          if (item.sports) {
            item.sports.forEach((sport) => {
              if (sport.durationInMinutes) {
                const minutes = sport.durationInMinutes;

                if (accumulator[date]) { //Checks if accumulator already has an entry for the current date.
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

        //if item.water is truthy (a valid numeric string), 
        //it will be converted to an integer using parseInt. Otherwise, it will default to 0.
       //ParseInt as well valid
        // const sleepDataRetrieved = data.map((item) => ({
        //   date: item.date.split("T")[0],
        //   sleep: item.sleep ? parseInt(item.sleep) : 0,
        // }));


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
    setShowChart(true); // Show the chart after retrieving data
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

  const handleCloseChart = () => {
    setShowChart(false); // Close the chart
    setIsLoaded(false);
    console.log(filteredSportsData) //Reset isLoaded to show the "Check Activity Analysis" button
  };

 
  return (
    <div
      className="wrapper d-flex flex-column justify-content-center align-items-center">
      <Form.Group controlId="startDate" className="mb-4">
        <Form.Label className="mb-2 mt-2 pt-2">
          <FontAwesomeIcon icon={faCalendarDays} /> Choose Dates{" "}
        </Form.Label>
      </Form.Group>
      <Form.Group>
        <Form.Label className="mb-4 pr-3"> Start Date </Form.Label>
        <Form.Control
          as={DatePicker}
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          className="form-control"
          placeholderText="Start Date"
        />
      </Form.Group>

      <Form.Group controlId="endDate" className="mb-4">
        <Form.Label className="mb-2">End Date</Form.Label>
        <Form.Control
          as={DatePicker}
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          className="form-control"
          placeholderText="End Date"
        />
      </Form.Group>
      <Form.Group className="pb-4">
        <Form.Text id="noteBlock" className="pb-5 " muted>
          After first check, just change the dates. Analysis shows up! 📊
        </Form.Text>
      </Form.Group>

      {!isLoaded && !showChart && (
        <Col md={4}>
          <Button
            variant="outline-info"
            onClick={handleRetrieveData}
            className="mb-4 "
          >
            Let's see! 👀
          </Button>
        </Col>
      )}

      {/* Display Filtered Data */}
      {isLoaded && showChart && (
        <>
          {/* Water Consumption Chart */}
          <div>
            <h2>Your Hydration Level(liters)</h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart
                width={1000}
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
                  activeDot={{ r: 8 }} //a circle with a radius of 8 units.
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Sports Duration Chart */}
          <div>
            <h2>Workout Duration (minutes)</h2>
            <ResponsiveContainer width="100%" height={200}>
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
            </ResponsiveContainer>
          </div>

          {/* Sleep Chart */}
          <div>
            <h2>Sleep Duration (hours)</h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={sleepFilteredData}>
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
            </ResponsiveContainer>
          </div>
          <Button
            variant="outline-info"
            onClick={handleCloseChart}
            className="mt-4 mb-4"
          >
            Close Chart
          </Button>
        </>
      )}
      {/* {isLoaded && !showChart ? (
        <Col md={4}>
          <Button variant="primary" onClick={handleRetrieveData}>
            Check Activity Analysis
          </Button>
        </Col>
      ) : null} */}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}
