import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LikeStyleButton from "../Style/LikeStyleButton";
import { Card, Button } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import "../../App.css";

const API_URL = "http://localhost:5005";

const AdminStyleList = () => {
  const [styles, setStyles] = useState([]);
  const [modalVisibility, setModalVisibility] = useState({});
  const [infoContent, setInfoContent] = useState({});

  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(`${API_URL}/api/admin-style`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((response) => {
        setStyles(response.data);
        console.log("GET Style Response", response.data);
      })
      .catch((error) => {
        console.error("Error fetching Style data:", error);
      });
  }, []);

  const updateLikeCount = (styleId, liked) => {
    setStyles((prevStyles) =>
      prevStyles.map((style) =>
        style._id === styleId
          ? {
              ...style,
              likeCount: liked ? style.likeCount + 1 : style.likeCount - 1,
            }
          : style
      )
    );
  };

  const handleInfoClick = (styleId) => {
    setModalVisibility((prevVisibility) => ({
      ...prevVisibility,
      [styleId]: !prevVisibility[styleId],
    }));
  };

  return (
    <div>
      <h2 className="mb-5 mt-5"> Counts STYLE List</h2>
      <ul>
        {styles.map((style) => (
          <li key={style._id}>
            <h5 className="mb-3 mt-5">{style.title}</h5>
            {style.imageUrl && (
              <div style={{ position: "relative" }}>
                <img src={style.imageUrl} alt={style.title} width="300" />
                <button
                  style={{
                    padding: "5px 10px",
                    cursor: "pointer",
                    backgroundColor: "pink",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                  }}
                  onClick={() => handleInfoClick(style._id)}
                >
                  <FontAwesomeIcon icon={faCirclePlus} />
                </button>
              </div>
            )}
            <div className="mb-3 mt-3">
              <Link to={`/style/${style._id}`}>View Style</Link>
            </div>
            <LikeStyleButton
              styleId={style._id}
              onUpdateLikeCount={updateLikeCount}
            />

            <span>Likes: {style.likeCount}</span>

            {modalVisibility[style._id] && (
              <div
                style={{
                  display: "block",
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  backgroundColor: "white",
                  padding: "5px",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.15)",
                  borderRadius: "10px",
                }}
              >
                <textarea
                  value={infoContent[style._id] || ""}
                  onChange={(e) =>
                    setInfoContent({
                      ...infoContent,
                      [style._id]: e.target.value,
                    })
                  }
                  placeholder="Counts FAV!"
                  rows="1"
                  cols="6"
                  style={{
                    width: "70%",
                    paddingTop: "4px",
                    paddingLeft: "0px",
                    paddingRight: "0px",
                    borderRadius: "5px",
                    border: "none",
                    marginTop: "0px",
                    resize: "none",
                    fontSize: "12px",
                    color: "red",
                    textAlign: "center",
                  }}
                />

                <Link to="/joke" target="_blank">
                  <button
                    style={{
                      marginTop: "0px",
                      padding: "3px 9px",
                      cursor: "pointer",
                      backgroundColor: "Pink",
                      color: "black",
                      fontWeight: "bold",
                      border: "none",
                      borderRadius: "5px",
                      fontSize: "12px",
                    }}
                  >
                    Quick Add
                  </button>
                </Link>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminStyleList;
