import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Chart from "./Chart";
import DailyApp from "../components/DailyApp";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import ProfileDetails from "../components/ProfileDetails";
import AddActivity from "../components/addActivity";

const API_URL = "http://localhost:5005";

function Checkin() {
  const [checkin, setCheckin] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const getActivity = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/api/checkin`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setCheckin(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getActivity();
  }, []);
console.log("checkin DATA", checkin)
  return (
    <div className="checkin-details">
      <DatePicker
        selected={startDate}
        onChange={handleDateChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        isClearable={true}
      />

      {checkin.map((activity, index) => {
        return (
          <div className="Activity-card" key={activity._id}>
            <Link to={`/checkin/${activity._id}`}>
              <h3>Activity {index + 1}</h3>
            </Link>
          </div>
        );
      })}

      <DailyApp />
      <Chart />
    </div>
  );
}

export default Checkin;
