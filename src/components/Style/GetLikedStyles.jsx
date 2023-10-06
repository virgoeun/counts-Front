import React, { useState, useEffect } from "react";
import axios from "axios";
import LikedStyleButton from "./LikeStyleButton";
import { Card, Button } from "react-bootstrap";

const API_URL = "https://counts-back.onrender.com";

const GetLikedStyles = ({user}) => {
  const [likedStyles, setLikedStyles] = useState([]);

  const getLikedStyleFunction = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/api/style`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
    
        const likedStylestwo = response.data.filter(
          (style) => style.likes.length > 0
        );
        setLikedStyles(likedStylestwo);
      })
      .catch((error) => console.log(error));
  };

//   axios
//   .get(`${API_URL}/api/style`, {
//     headers: { Authorization: `Bearer ${storedToken}` },
//   })
//   .then((response) => {
//     const likedStylestwo = response.data.filter((style) =>
//       style.likes.includes(user._Id)
     
//     );
//     setLikedStyles(likedStylestwo);
//     console.log("Like", likedStylestwo)
//   })
//   .catch((error) => console.log(error));
// };


  useEffect(() => {
    getLikedStyleFunction();
  }, []);

  return (
    <div>
    <h1 className="mt-5 mb-5">Your  ❤️ Styles:</h1>
    <div className="card-container d-flex flex-wrap justify-content-center" style={{ gap: "20px" }}>
      {likedStyles.map((style) => (
        <Card className="" key={style._id} style={{ marginBottom: "20px", width: "300px" }}>
          <Card.Header>
            <Card.Title className="text-primary" style={{ fontSize: "0.84em" }}>
              {style.title}
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <Card.Img
              src={style.imageUrl}
              alt={style.title}
              style={{ width: "100%", height: "300px", objectFit: "cover" }}
            />
            <LikedStyleButton
              styleId={style._id}
              onUpdateLikeCount={() => {
                // Do something when like count is updated
              }}
            />
            {/* Add the appropriate link for style */}
            <Button variant="outline-primary" onClick={() => window.location.href=`/style/${style._id}`}>
              Go to Style
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  </div>
);
};

export default GetLikedStyles;
