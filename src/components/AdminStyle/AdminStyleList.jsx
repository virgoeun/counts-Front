// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import LikeStyleButton from "../Style/LikeStyleButton";

// const API_URL = "http://localhost:5005";

// function AdminStyleList() {
//   const [styles, setStyles] = useState([]);
//   const storedToken = localStorage.getItem("authToken");

//   useEffect(() => {
//     axios
//       .get(`${API_URL}/api/admin-style`, {
//         headers: { Authorization: `Bearer ${storedToken}` },
//       })
//       .then((response) => {
//         setStyles(response.data);
//         console.log("GET Style Resonpse", response.data)
//       })
//       .catch((error) => {
//         console.error("Error fetching Style data:", error);
//       });
//   }, []); // The empty dependency array ensures the effect runs once, like componentDidMount

//   const updateLikeCount = (styleId, liked) => {
//     setStyles((prevStyles) =>
//     prevStyles.map((style) =>
//         style._id === styleId
//           ? { ...style, likeCount: liked ? style.likeCount + 1 : style.likeCount - 1 }
//           : style
//       )
//     );
//   };

//   return (
//     <div>
//       <h2> Style List</h2>
//       <ul>
//         {styles.map((style) => (
//           <li key={style._id}>
//             <h3>{style.title}</h3>
//             {style.imageUrl && (
//               <img src={style.imageUrl} alt={style.title} width="300" />
//             )}
//             <LikeStyleButton styleId={style._id} onUpdateLikeCount={updateLikeCount} />
//             <span> Likes: {style.likeCount}</span>

//             <p>Description: {style.description}</p>

//           </li>
//         ))}
//       </ul>

//     </div>
//   );
// }

// export default AdminStyleList;

import React, { useState, useEffect } from "react";
import axios from "axios";
import LikeStyleButton from "../Style/LikeStyleButton";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';


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
      <h2>Style List</h2>
      <ul>
        {styles.map((style) => (
          <li key={style._id}>
            <h3>{style.title}</h3>
            {style.imageUrl && (
              <div style={{ position: "relative" }}>
                <img src={style.imageUrl} alt={style.title} width="300" />
                <button
                  style={{
                    padding: "5px 10px",
                    cursor: "pointer",
                    backgroundColor: "blue",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                  }}
                  onClick={() => handleInfoClick(style._id)}
                >
                 <FontAwesomeIcon icon={faCirclePlus} /> Info
                </button>
              </div>
            )}
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
                  placeholder="Write your information here..."
                  rows="2"
                  cols="1"
                  style={{
                    width: "70%",
                    paddingTop: "4px",
                    paddingLeft: "0px",
                    paddingRight: "0px",
                    borderRadius: "5px",
                    border: "none",
                    marginTop: "0px",
                    resize: "none",
                    fontSize: "15px",
                    color: "rgba(128, 128, 128, 1)",
                    textAlign:"center"
                  }}
                />
                <button
                  style={{
                    marginTop: "10px",
                    padding: "3px 9px",
                    cursor: "pointer",
                    backgroundColor: "white",
                    color: "grey",
                    border: "none",
                    borderRadius: "5px",
                    fontSize: "10px",
                  }}
                  onClick={() => handleInfoClick(style._id)}
                >
                  Close
                </button>
                <button
                  style={{
                    marginTop: "10px",
                    padding: "3px 9px",
                    cursor: "pointer",
                    backgroundColor: "Pink",
                    color: "black",
                    border: "none",
                    borderRadius: "5px",
                    fontSize: "10px",
                  }}
                  onClick={() => window.location.href = 'https://www.aloyoga.com/products/m3193r-conquer-1-4-zip-reform-long-sleeve-navy'}
                >
                  Add to Cart
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminStyleList;
