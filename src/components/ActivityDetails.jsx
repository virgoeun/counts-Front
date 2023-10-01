// src/pages/ProjectDetailsPage.jsx
// ... previous imports stay unchanged
import { Link, useParams } from "react-router-dom"; 
import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5005";        

function ActivityDetails (props) {
  const [activity, setactivity] = useState(null);
  // Get the URL parameter `:projectId` 
  const { activityId } = useParams();       
  
  const storedToken = localStorage.getItem("authToken");
  console.log("StoredToken", storedToken)
  // Helper function that makes a GET request to the API
  // and retrieves the project by id
  const getActivity = () => {          
    axios
      .get(`${API_URL}/api/checkin/${activityId}`,{
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneActivity = response.data;
        setactivity(oneActivity);
        
      })
      .catch((error) => console.log(error));
  };
  
  
  useEffect(()=> {                   
    getActivity();
  }, [] );

  
  return (
    <div className="ActivityDetails">
      {activity && (
        <>
          <h1>{activity.date}</h1>
          <p>{activity.stress}</p>
          <p>{activity.water}</p>
          <p>{activity.sleep}</p>
          <p>{activity.sports.type}</p>
        </>
      )}

      {activity &&
        activity.sports.map((sport, index) => (
          <li className="Sports card" key={index}>
              <h4>Type:</h4>
            <h3>{sport.type}</h3>
            <h4>Level:</h4>
            <p>{sport.level}</p>
            <h4>Duration:</h4>
            <p>{sport.durationInMinutes}</p>
            <h4>Description:</h4>
            <p>{sport.description}</p>
          </li>
        ))}
  {/* <AddActivity refreshProject={getActivity} /> */}
      
  {/* <AddActivity refreshProject={getActivity} activityId={activityId} /> */}
      <Link to="/checkin">
        <button>Back to My Logs</button>
      </Link>
      
      {/*    ADD    */}
      <Link to={`/checkin/edit/${activityId}`}>
        <button>Edit Activity</button>
      </Link>      
      
    </div>
  );
}

export default ActivityDetails;
