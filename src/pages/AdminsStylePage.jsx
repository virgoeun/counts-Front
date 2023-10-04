import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import AddAmindStyle from "../components/AdminStyle/AddAdminStyle";

const API_URL = 'http://localhost:5005';

function AdminStylePage() {
    const navigate = useNavigate();
    const [adminStyles, setAdminStyles] = useState([]);
    const getAdminStyles = () => {
        // Get the token from the localStorage
        const storedToken = localStorage.getItem("authToken");
        
        // Send the token through the request "Authorization" Headers
        axios
          .get(`${API_URL}/api/admin-style`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
          .then((response) => setAdminStyles(response.data))
          .catch((error) => console.log(error));
      };
    
      // We set this effect will run only once, after the initial render
      // by setting the empty dependency array - []
      useEffect(() => {
        getAdminStyles();
      }, []);
      console.log("Admin Style ", adminStyles);
    return (
        <> <AddAmindStyle refreshStyles={getAdminStyles}/>
         {/* <button onClick={() => navigate('/bookmarks')}>Go to Bookmarks</button> */}
        </>


    )
  };


export default AdminStylePage;


