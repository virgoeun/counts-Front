import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";

const API_URL = import.meta.env.VITE_SERVER_URL;

const Music = () => {
    const [spotifyPlaylist, setspotifyPlaylist] = useState([]);
  
    const storeToken = (token) => {
      localStorage.setItem("authToken", token);
    };
  
    const storedToken = localStorage.getItem("authToken");
    console.log("Token", storedToken);
  
    useEffect(() => {
      // Make the API request to get Instagram posts
  
      console.log("Authorization Header:", `Bearer ${storedToken}`);
  
      axios
        .get(`${API_URL}/api/music`, {
          headers: {
            Authorization: `Bearer ${storedToken}`, // Make sure storedToken contains a valid JWT
          },
        })
        .then((response) => {
          setspotifyPlaylist(response.data.playlists.items);
          console.log("Spotify Data:", response.data.playlists.items);
        })
        .catch((error) => {
          console.error("Error fetching Spotify Data:", error);
        });
    }, []);
  
    return (
      <div className="container mt-5">
      <h1>Counts Flow 🎵</h1>
      <p>Along with the music flow, get you body moving!💃 </p>
      <div className="d-flex flex-row flex-wrap justify-content-between">
        {spotifyPlaylist.length > 0 ? (
          spotifyPlaylist.slice(0, 4).map((playlist, index) => (
            <Card key={index} style={{ width: "18rem", margin: "10px 0" }}>
              <Card.Img variant="top" src={playlist.data.images.items[0].sources[0].url} />
              <Card.Body>
                <Card.Title>{playlist.data.name}</Card.Title>
                <Button
                  onClick={() => {
                    window.open(playlist.data.uri, "_blank");
                  }}
                >
                  Check on Spotify 🎧
                </Button>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p>Loading Spotify Playlist ...🥁🎶</p>
        )}
      </div>
    </div>
  );
};

export default Music;