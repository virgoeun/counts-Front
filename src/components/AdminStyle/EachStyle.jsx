import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../App.css";
import { Button } from "react-bootstrap";

const API_URL = "https://counts-back.onrender.com";

function EachStyle() {
  const { styleId } = useParams();
  const [style, setStyle] = useState(null);
  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    // Fetch the workout data from the server
    axios
      .get(`${API_URL}/api/style/${styleId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setStyle(response.data);
        console.log("GET Workout Response", response.data);
      })
      .catch((error) => {
        console.error("Error fetching workout data:", error);
      });
  }, [styleId]); // Fetch data whenever workoutId changes

  return (
    <div>
      {style ? (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h2 className="mt-5 mb-5" style={{ fontSize: "2rem", color: "" }}>
              Style
            </h2>
            <h4 className="mt-1 mb-3" style={{ fontSize: "1.45rem" }}>
              {style.title}
            </h4>
            {style.imageUrl && (
              <img
                src={style.imageUrl}
                alt={style.title}
                className="mb-4"
                width="300"
              />
            )}

            <p
              style={{
                maxWidth: "440px",
                textAlign: "center",
                color: "#808080",
              }}
              className="mb-3"
            >
              {style.description}
            </p>

            <h5>Price: 48€</h5>

            <Link to="/joke" target="_blank">
              <button
                style={{
                  marginTop: "10px",

                  padding: "12px 25px",
                  cursor: "pointer",
                  backgroundColor: "Pink",
                  color: "black",
                  fontWeight: "bold",
                  border: "none",
                  borderRadius: "5px",
                  fontSize: "22px",
                }}
              >
                Add to Cart
              </button>
            </Link>
            <Link to="/style">
              <Button variant="link" id="backtostyle-btn" className="mt-2">
                Back to Style List
              </Button>
            </Link>
          </div>
        </>
      ) : (
        <p>Loading style...</p>
      )}
    </div>
  );
}

export default EachStyle;
