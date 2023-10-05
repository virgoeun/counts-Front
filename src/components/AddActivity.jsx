import { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5005";

function AddActivity(props) {
  const [date, setDate] = useState("");
  const [stress, setStress] = useState("");
  const [water, setWater] = useState("");
  const [sleep, setSleep] = useState("");
  const [note, setNote] = useState("");
  const [sportType, setSportType] = useState("");
  const [sportLevel, setSportLevel] = useState("");
  const [sportDuration, setSportDuration] = useState("");
  const [sportDescription, setSportDescription] = useState("");


  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
        // userId:props.userId,
      date,
      sleep,
      water,
      stress,
      sports: [
        {
          type: sportType,
          level: sportLevel,
          durationInMinutes: sportDuration,
          description: sportDescription,
        },
      ],

      note,
    }; 

    console.log("Frontend Request Body:", requestBody);

    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .post(`${API_URL}/api/checkin`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        // Reset the state to clear the inputs
        setDate("");
        setSleep("");
        setWater("");
        setStress("");
        setNote("");
        setSportType(""); 
        setSportLevel("");
        setSportDuration("");
        setSportDescription("");

        props.refreshProject();
      })
      .then((response) => {
        navigate(`/checkin`);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="AddTask">
      <h3>Add New Task</h3>

      <form onSubmit={handleSubmit}>
        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <label>Stress:</label>
        <select
          name="stress"
          value={stress}
          onChange={(e) => setStress(e.target.value)}
        >
          <option value="">Choose Stress Level</option>
          <option value="0">Burned-out🤯</option>
          <option value="4">Middle</option>
          <option value="8">Low</option>
          <option value="10">No Stress!🥰</option>
        </select>
        <label>Sleep:</label>
        <select
          name="sleep"
          value={sleep}
          onChange={(e) => setSleep(e.target.value)}
        >
          <option value="">Choose Sleep Duration</option>
          <option value="8">+8 hours</option>
          <option value="7">+7 hours</option>
          <option value="6">+6 hours</option>
          <option value="4.5">+4~5 hours</option>
          <option value="3">I need Sleep! 😪</option>
        </select>

        <label>Hydration:</label>
        <select
          name="water"
          value={water}
          onChange={(e) => setWater(e.target.value)}
        >
          <option value="">Choose Hydration Amount</option>
          <option value="3">+3l 💧💧💧</option>
          <option value="2">+2l 💧💧</option>
          <option value="1">+1l 💧</option>
          <option value="0.5">+0.5l 💦</option>
        </select>

        <label>Note:</label>
        <textarea
          type="text"
          name="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <label>Sport Type:</label>
        <select
          name="sportType"
          value={sportType}
          onChange={(e) => setSportType(e.target.value)}
        >
          <option value="">Select Sport Type</option>
          <option value="Yoga/Pilates">Yoga/Pilates</option>
          <option value="Crossfit">Crossfit</option>
          <option value="Walk">Walk</option>
          <option value="Water Sports">Water Sports</option>
          <option value="Winter Sports">Winter Sports</option>
          <option value="Stretching">Stretching</option>
          <option value="Run">Run</option>
          <option value="Cycling">Cycling</option>
          <option value="Hiking">Hiking</option>
          <option value="Bouldering">Bouldering</option>
          <option value="Boxing">Boxing</option>
          <option value="Body Weight Training">Body Weight Training</option>
          <option value="Others">Others</option>
        </select>

        <label>Sport Level:</label>
        <select
          name="sportLevel"
          value={sportLevel}
          onChange={(e) => setSportLevel(e.target.value)}
        >
          <option value="">Select Sport Level</option>
          <option value="High-Intensity 🥵">High-Intensity 🥵</option>
          <option value="Mid-Intensity 😊">Mid-Intensity 😊</option>
          <option value="Mild 😌">Mild 😌</option>
        </select>

        <label>Sport Duration:</label>
        <select
          name="sportDuration"
          value={sportDuration}
          onChange={(e) => setSportDuration(e.target.value)}
        >
  <option value="">Select Sport Duration</option>
          <option value="3">+3 hours</option>
          <option value="2">+2 hours</option>
          <option value="1">+1 hours</option>
          <option value="0.5">+30 minutes</option>
          <option value="0.25">+20 minutes</option>
          <option value="0.1">10 minutes!😎</option>
        </select>

        <label>Sport Description:</label>
        <textarea
          type="text"
          name="sportDescription"
          value={sportDescription}
          onChange={(e) => setSportDescription(e.target.value)}
        />

        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default AddActivity;
