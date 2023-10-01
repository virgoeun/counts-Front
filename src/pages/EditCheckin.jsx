import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
 
const API_URL = "http://localhost:5005";

function EditCheckin() {

    const [date, setDate] = useState("");
    const [stress, setStress] = useState("");
    const [water, setWater] = useState("");
    const [sleep, setSleep] = useState("");
    const [note, setNote] = useState("");
    const [sports, setSports] = useState("");
    
   
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

          setDate(oneActivity.date);
          setStress(oneActivity.stress);
          setSleep(oneActivity.sleep);
          setWater(oneActivity.water);
          setNote(oneActivity.note);
          setSports(oneActivity.sports);
        })
        .catch((error) => console.log(error));
      
    }, [activityId]);
    
    
   
    const handleFormSubmit = (e) => {
      e.preventDefault();
      const requestBody = {date, sleep, water, stress, sports, note };
   


    axios
  .put(`${API_URL}/api/checkin/${activityId}`, requestBody, {
    headers: { Authorization: `Bearer ${storedToken}` },
  })
  .then((response) => {
    navigate(`/checkin/${activityId}`);
  })
  .catch((error) => console.log(error));
    
}
    
    const deleteActivity = () => {                    //  <== ADD
      // Make a DELETE request to delete the project
      axios
        .delete(`${API_URL}/api/checkin/${activityId}`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
        .then(() => {
          // Once the delete request is resolved successfully
          // navigate back to the list of projects.
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
    
        <label>Hydreation:</label>
        <input
          type="text"
          name="water"
          value={water}
          onChange={(e) => setWater(e.target.value)}
        />
        <label>Note:</label>
        <input
          type="text"
          name="sports"
          value={sports}
          onChange={(e) => setNote(e.target.value)}
        />
<label>Note:</label>
        <textarea
          type="text"
          name="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button type="submit">Update Activity</button>
        </form>
        
        {/*     ADD     */}
        <button onClick={deleteActivity}>Delete Activity</button>
      </div>
    );
}

export default EditCheckin