import CreateBookmark from "../components/Bookmarks/CreateBookmark";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "https://counts-back.onrender.com";

function Favorite() {
  const navigate = useNavigate();
  const [bookmark, setBookmark] = useState([]);
  const getBookmarks = () => {
    const storedToken = localStorage.getItem("authToken");

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
    <>
      {" "}
      <CreateBookmark refreshBookmarks={getBookmarks} />
    </>
  );
}

export default Favorite;
