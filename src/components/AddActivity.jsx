import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5005";

function AddActivity(props) {
  const [date, setDate] = useState("");
  const [stress, setStress] = useState("");
  const [water, setWater] = useState("");
  const [sleep, setSleep] = useState("");
  const [note, setNote] = useState("");
  const [selectedSport, setSelectedSport] = useState(""); // State to store the selected sport

  const handleSubmit = (e) => {
    e.preventDefault();

    // We need the project id when creating the new task
    //const { activityId } = props;
    // Create an object representing the body of the POST request
    const requestBody = { date, sleep, water, stress, sports: selectedSport, note }; // Use selectedSport here

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
        setSelectedSport(""); // Reset the selected sport
        // Invoke the callback function coming through the props
        // from the ProjectDetailsPage, to refresh the project details
        props.refreshProject();
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
        <textarea
          type="text"
          name="stress"
          value={stress}
          onChange={(e) => setStress(e.target.value)}
        />
        <label>Sleep:</label>
        <textarea
          type="text"
          name="sleep"
          value={sleep}
          onChange={(e) => setSleep(e.target.value)}
        />

        <label>Hydration:</label>
        <input
          type="text"
          name="water"
          value={water}
          onChange={(e) => setWater(e.target.value)}
        />

        <label>Note:</label>
        <textarea
          type="text"
          name="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <label>Sport:</label>
        <select
          name="sports"
          value={selectedSport}
          onChange={(e) => setSelectedSport(e.target.value)} // Update selectedSport state
        >
          <option value="">Select a Sport</option>
          <option value="Football">Football</option>
          <option value="Basketball">Basketball</option>
          <option value="Swimming">Swimming</option>
          {/* Add more sport options here */}
        </select>

        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default AddActivity;
