import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";

import React, { useEffect, useState } from "react";

const InspirationPage = () => {
  const [instagramPosts, setInstagramPosts] = useState([]);

  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  }  
    
    const storedToken = localStorage.getItem("authToken");
    console.log("Token", storedToken)

  useEffect(() => {
    // Make the API request to get Instagram posts
    axios
      .get(`${API_URL}/api/inspiration`, {headers: {
        Authorization: `Bearer ${storedToken}` // Make sure storedToken contains a valid JWT
      },
    }) 
      .then((response) => {
        setInstagramPosts(response.data);
        console.log("Instagram info:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching Instagram posts:", error);
      });
  }, []);

  return (
    <div>
      <h1>Inspiration Page</h1>
      {instagramPosts.length > 0 ? (
        <div>
          {/* Map over Instagram posts and render each item */}
          {instagramPosts.map((post, index) => (
            <div key={index}>
              <p>Post:</p>

              <button
          onClick={() => {
            window.open(post.node.display_url, '_blank');
          }}
        >
          Open Post
        </button>
              <Link to={post.node.display_url} target="_blank">
          <img src={post.node.display_url} alt={`Post ${index}`} />
        </Link>
        <p>Video Post:</p>
        {/* Use Link component for the "Video" link */}
        <Link to={post.node.video_url} target="_blank">
          <img src={post.node.thumbnail_src} alt={`Video ${index}`} />
        </Link>
              {/* <img src={post.node.thumbnail_src} /> */}
            </div>
          ))}
        </div>
      ) : (
        <p>Loading Inspiration ...</p>
      )}
    </div>
  );
};

export default InspirationPage;