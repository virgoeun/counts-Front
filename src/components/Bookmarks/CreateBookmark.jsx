import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIcons } from "@fortawesome/free-solid-svg-icons";
import { Card, Button, Form, FormGroup } from "react-bootstrap";
import "../../App.css";

const API_URL = "https://counts-back.onrender.com";

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
  const [imageUrl, setImageUrl] = useState("");

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

  return (
    <div>
      <h2 className="mt-5">Create Your Own FAVs </h2>{" "}
      <FontAwesomeIcon icon={faIcons} className="mt-3 fa-4x" />
      <div className="d-flex justify-content-center mt-5 mb-4">
        <Form style={{ width: "70%" }} onSubmit={handleSubmit}>
          <FormGroup>
            <Form.Control
              type="text"
              name="name"
              className="mt-1 mb-3"
              placeholder="Name"
              value={bookmarkData.name}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Form.Control
              type="text"
              name="uri"
              className="mt-3 mb-3"
              placeholder="URI"
              value={bookmarkData.uri}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Form.Control
              as="select"
              name="category"
              className="mt-3 mb-3"
              value={bookmarkData.category}
              onChange={handleChange}
            >
              <option value="">Select a category</option>
              <option value="style">Style</option>
              <option value="food">Food</option>
              <option value="location">Location</option>
              <option value="music">Music</option>
            </Form.Control>
          </FormGroup>
          <Button variant="warning" type="submit">
            Create
          </Button>
        </Form>
      </div>
      <button>
        <Link to="/profile">Go back to Profile 🐈‍⬛</Link>
      </button>
      {/* <button onClick={getAllBookmarks}>Get All Your Saved Faves 😍</button> */}
      <button onClick={fetchAllBookmarks}>
        {showBookmarks
          ? "Hide Your Faves List 😍"
          : "Get All Your Saved Faves 😍"}
      </button>
      {/* Display the list of bookmarks */}
      {showBookmarks && bookmarkList.length > 0 && (
        <div className=" justify-content-center" style={{ width: "100%" }}>
          <div  className="w-40">
            <h3 className="mt-5 mb-5">Your Saved Faves 😍</h3>
            {bookmarkList.map((bookmark) => (
              <Card key={bookmark._id} className="mb-3">
                <Card.Body>
                  <Card.Title>
                    <FontAwesomeIcon icon={faIcons} className="mt-3 fa-2x" />{" "}
                    <strong>Creator:</strong>
                    {bookmark.name} <strong></strong>
                  </Card.Title>
                  <a
                    href={bookmark.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button
                      style={{
                        backgroundColor: "rgb(255,192,203)",
                        color: "white",
                        border: "solid",
                        padding: "5px 10px",
                        borderRadius: "15px",
                      }}
                    >
                      Link to the Page
                    </button>
                  </a>
                  <Card.Text>
                    <strong>Category:</strong> {bookmark.category}
                  </Card.Text>
                  <button
                    className="btn btn-outline-info"
                    style={{
                      border: "2px solid lightblue",
                      padding: "0px 13px",
                      color: "lightblue",
                      backgroundColor: "transparent",
                      marginBottom: "20px",
                    }}
                    onClick={() => navigate(`/bookmarks/edit/${bookmark._id}`)}
                  >
                    Edit
                  </button>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateBookmark;
