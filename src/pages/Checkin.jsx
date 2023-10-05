//tilecontent try

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Chart from "./Chart";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../index.css";

const API_URL = "http://localhost:5005";

function Checkin() {
  const [checkin, setCheckin] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [markedDates, setMarkedDates] = useState([]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    const fetchCheckinData = async () => {
      try {
        const storedToken = localStorage.getItem("authToken");

        if (selectedDate) {
          const formattedDate = selectedDate.toISOString().split("T")[0];
          const response = await axios.get(`${API_URL}/api/checkin`, {
            params: { date: formattedDate },
            headers: { Authorization: `Bearer ${storedToken}` },
          });

          console.log("DATA response data on DATE", response.data);
          setCheckin(response.data);

          // Mark the dates where data exists
          const markedDates = response.data.map(
            (activity) => new Date(activity.date)
          );
          console.log("marked", markedDates);
          setMarkedDates(markedDates);
        }
      } catch (error) {
        console.log("Error fetching checkin data:", error);
      }
    };

    fetchCheckinData();
  }, [selectedDate]);

  const tileContent = ({ date }) => {
    return markedDates.includes(date) ? (
      <div className="highlighted-date"></div>
    ) : null;
  };

  const filteredActivities = checkin.filter(
    (activity) =>
      new Date(activity.date).toLocaleDateString() ===
      selectedDate?.toLocaleDateString()
  );

  return (
    <div className="checkin-details">
      <Calendar
        value={selectedDate}
        onChange={handleDateChange}
        tileContent={tileContent}
      />
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        selectsRange={false}
        isClearable={true}
      />
      {filteredActivities.map((activity, index) => {
        return (
          <div className="Activity-card" key={activity._id}>
            <Link to={`/checkin/${activity._id}`}>
              <h3>Activity {index + 1}</h3>
              <p>Date: {new Date(activity.date).toLocaleDateString()}</p>
            </Link>
          </div>
        );
      })}

      <Chart />
    </div>
  );
}

export default Checkin;
