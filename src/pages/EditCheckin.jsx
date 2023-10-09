import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_SERVER_URL;

function EditCheckin() {
  const [date, setDate] = useState("");
  const [stress, setStress] = useState("");
  const [water, setWater] = useState("");
  const [sleep, setSleep] = useState("");
  const [note, setNote] = useState("");
  const [sportType, setSportType] = useState("");
  const [sportLevel, setSportLevel] = useState("");
  const [sportDuration, setSportDuration] = useState("");
  const [sportDescription, setSportDescription] = useState("");

  const { activityId } = useParams();
  const navigate = useNavigate();
  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(`${API_URL}/api/checkin/${activityId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneActivity = response.data;
        const formattedDate = oneActivity.date.substring(0, 10);

        setDate(formattedDate);
        setStress(oneActivity.stress);
        setSleep(oneActivity.sleep);
        setWater(oneActivity.water);
        setNote(oneActivity.note);
        setSportType(oneActivity.sports[0].type);
        setSportLevel(oneActivity.sports[0].level);
        setSportDuration(oneActivity.sports[0].durationInMinutes);
        setSportDescription(oneActivity.sports[0].description);
      })
      .catch((error) => console.log(error));
  }, [activityId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requestBody = {
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

    axios
      .put(`${API_URL}/api/checkin/${activityId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        navigate(`/checkin/${activityId}`);
      })
      .catch((error) => console.log(error));
  };

  const deleteActivity = () => {
    axios
      .delete(`${API_URL}/api/checkin/${activityId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        navigate("/checkin");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="EditProjectPage">
      <h3>Edit the Project</h3>

      <form onSubmit={handleFormSubmit}>
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

        <label>Sport Duration (minutes):</label>
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
        <button type="submit">Update Activity</button>
      </form>

      <button onClick={deleteActivity}>Delete Activity</button>
    </div>
  );
}

export default EditCheckin;
