import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const API_URL = "http://localhost:5005";

const EditBookmark = () => {
  const { bookmarkId } = useParams();
  const [bookmarkData, setBookmarkData] = useState({ name: '', uri: '', category: '' });
  const navigate = useNavigate();

  const storedToken = localStorage.getItem("authToken");
    // Fetch the bookmark data by its ID and set it to the state.
    useEffect(() => {
      axios
        .get(`${API_URL}/api/bookmarks/${bookmarkId}`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
        .then((response) => {
          // Update bookmarkData with the fetched data
          setBookmarkData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching bookmark:', error);
        });
    }, [bookmarkId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookmarkData({ ...bookmarkData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`${API_URL}/api/bookmarks/${bookmarkId}`,bookmarkData, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        // After a successful update, you can redirect the user to the bookmarks list.
        navigate('/bookmarks');
      })
      .catch((error) => {
        console.error('Error updating bookmark:', error);
      });

    
  };
  const deleteBookmarks = () => {
    axios
      .delete(`${API_URL}/api/bookmarks/${bookmarkId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        navigate("/bookmarks");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h2>Edit Bookmark</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={bookmarkData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>URI:</label>
          <input
            type="text"
            name="uri"
            value={bookmarkData.uri}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Category:</label>
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
        </div>
        <button type="submit">Save Changes</button>
      </form>
      <button onClick={deleteBookmarks}>Delete a Bookmark</button>
      <button>
        <Link to="/profile">Go back to Profile 🐈‍⬛</Link>
      </button>
    </div>
  );
};

export default EditBookmark;
