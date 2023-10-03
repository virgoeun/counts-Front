import CreateBookmark from "../components/Bookmarks/CreateBookmark";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const API_URL = 'http://localhost:5005';

function Favorite() {
    const navigate = useNavigate();
    const [bookmark, setBookmark] = useState([]);
    const getBookmarks = () => {
        // Get the token from the localStorage
        const storedToken = localStorage.getItem("authToken");
        
        // Send the token through the request "Authorization" Headers
        axios
          .get(`${API_URL}/api/bookmarks`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
          .then((response) => setBookmark(response.data))
          .catch((error) => console.log(error));
      };
    
      // We set this effect will run only once, after the initial render
      // by setting the empty dependency array - []
      useEffect(() => {
        getBookmarks();
      }, []);
      console.log("Bookmarks ", bookmark);
    return (
        <> <CreateBookmark refreshBookmarks={getBookmarks}/>
         {/* <button onClick={() => navigate('/bookmarks')}>Go to Bookmarks</button> */}
        </>


    )
  };

 

export default Favorite;
