//tilecontent try
import Form from "react-bootstrap/Form";
import "../App.css"
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Chart from "./Chart";
import Graph from "../components/ChartGroup/ChartGroup";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../index.css";
import AddActivity from "../components/Activity/AddActivity";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
 faCalendarDays, faQuoteLeft
} from "@fortawesome/free-solid-svg-icons";

const API_URL = import.meta.env.VITE_SERVER_URL;

function Checkin() {
  const [checkin, setCheckin] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [markedDates, setMarkedDates] = useState([]);
  const [isChartVisible, setChartVisible] = useState(false);
  const [isAddActivityVisible, setAddActivityVisible] = useState(false);

  const handleToggleAddActivity = () => {
    setAddActivityVisible(!isAddActivityVisible);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  //show chart area or not
  const handleToggleChart = () => {
    setChartVisible(!isChartVisible);
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
  console.log("FIlter", filteredActivities)

  return (
    <div className="checkin-details">
   
      <h2 className="mb-5 mt-5">Your Daily Movement </h2>
      <div className="calendar-view">
      <Button variant="warning" onClick={handleToggleAddActivity}>
          {isAddActivityVisible ? 'Close' : 'Add Movement'}
        </Button>
        {isAddActivityVisible && <AddActivity />}

        <div className="d-flex justify-content-center mt-5 mb-4">
          <Calendar
            value={selectedDate}
            onChange={handleDateChange}
            tileContent={tileContent}
          />
          {/* <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        selectsRange={false}
        isClearable={true}
      /> */}
        </div>
       

        {filteredActivities.map((activity, index) => {
          return (
            <div className="Activity-card" key={activity._id}>
               <Form>
                <Form.Control 
                  type="text"
                  style={{ border: '2px solid rgb(255, 204, 153)' }}
                  as={Link}
                  to={`/checkin/${activity._id}`}
                  className="text-decoration-none custom-border"
                >
                  <FontAwesomeIcon icon={faQuoteLeft} /><h3>{activity.note}</h3>
                
                  <FontAwesomeIcon icon={faCalendarDays} /><p>Date {new Date(activity.date).toLocaleDateString()}</p>
                </Form.Control>

                <Form.Group className="pb-4">
        <Form.Text id="editMessage" className="pb-3 " muted style={{ fontSize: "0.9em"  }}>
          Click ☝️ for Edit
        </Form.Text>
      
      </Form.Group>
              </Form>

             
            </div>
          );
        })}

<Button variant="info" className="mt-5" onClick={handleToggleChart}>
          {isChartVisible ? "Close Analysis" : "Check Analysis"}
        </Button>
       
        {isChartVisible && <Graph />}

        {/* <Chart /> */}
      </div>
      <Form.Text id="noteBlock" className="mt-2" muted>
                  AI-powered Smart Analysis is comming Soon! 🙌
                </Form.Text>
    </div>
  );
}

export default Checkin;
