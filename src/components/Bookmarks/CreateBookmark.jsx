import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";
import { faIcons } from "@fortawesome/free-solid-svg-icons";
const API_URL = "http://localhost:5005";

function CreateBookmark({ refreshBookmarks }) {
  const navigate = useNavigate();

  const [bookmarkData, setBookmarkData] = useState({
    name: "",
    uri: "",
    category: "",
  });

  //fetching all faves
  const [bookmarkList, setBookmarkList] = useState([]);

  //fetched faves: button close
  const [showBookmarks, setShowBookmarks] = useState(false);

  // fave retrieve or not click event
  const toggleBookmarks = () => {
    setShowBookmarks(!showBookmarks);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookmarkData({ ...bookmarkData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, uri, category } = bookmarkData;
    const storedToken = localStorage.getItem("authToken");
    // Send a POST request to your Express backend with the extracted data
    axios
      .post(
        `${API_URL}/api/bookmarks`,
        { name, uri, category },
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then(() => {
        // Reset the form after successfully creating the bookmark
        setBookmarkData({ name: "", uri: "", category: "" });
        refreshBookmarks();

        // Redirect the user to the "/bookmarks" route
        navigate("/bookmarks");
      })
      .catch((error) => {
        console.error("Error creating bookmark:", error);
      });
  };

  const getAllBookmarks = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/api/bookmarks`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setBookmarkList(response.data))
      .catch((err) => console.log(err));
  };

  //close or show (all faves)
  const fetchAllBookmarks = () => {
    getAllBookmarks();
    toggleBookmarks(); // Optionally, close the bookmarks list after fetching data
  };

  //Not loaded when it mounts -> "getAllBookmarks" triggered by a button click
  // useEffect(() => {
  //   getAllBookmarks();
  // }, []);

  return (
    <div>
      <h2>Create Bookmark</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={bookmarkData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="uri"
          placeholder="URI"
          value={bookmarkData.uri}
          onChange={handleChange}
        />
        <select
          name="category"
          value={bookmarkData.category}
          onChange={handleChange}
        >
          <option value="">Select a category</option>
          <option value="style">Style</option>
          <option value="food">Food</option>
          <option value="location">Location</option>
          <option value="music">Music</option>
        </select>
        <button type="submit">Create</button>
      </form>
      <button>
        <Link to="/profile">Go back to Profile 🐈‍⬛</Link>
      </button>

      {/* <button onClick={getAllBookmarks}>Get All Your Saved Faves 😍</button> */}
      <button onClick={fetchAllBookmarks}>
        {" "}
        {showBookmarks
          ? "Hide Your Faves List 😍"
          : "Get All Your Saved Faves 😍"}{" "}
      </button>
      {/* Display the list of bookmarks */}
      {showBookmarks && bookmarkList.length > 0 && (
        <div>
          <h2>Your Saved Faves 😍</h2>
          <ul>
            {bookmarkList.map((bookmark) => (
              <li key={bookmark._id}>
           <FontAwesomeIcon icon={faIcons} /> <strong>Name:</strong>{" "}
                {bookmark.name}, <strong>URI:</strong>{" "}
                <a
                  href={bookmark.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {/* Add a button/link to open the URL */}
                  <button style={{ backgroundColor: 'rgb(255,192,203)', color: 'white', border: 'solid', padding: '5px 10px', borderRadius: '15px' }}>Link to the Page</button>
                </a>
                <strong>Category:</strong> {bookmark.category}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CreateBookmark;
