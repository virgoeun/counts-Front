


//RECENT
import image1 from "../../assets/style/manblue.png";
import image2 from "../../assets/style/lounge.png";
import image3 from "../../assets/style/blue.png";
import image4 from "../../assets/style/run2.png";
import image5 from "../../assets/style/basic2.png";
import image6 from "../../assets/style/whiteshirt.png";
import heartarrow from "../../assets/hearts/heart-arrow.png"
import heartbroken from "../../assets/hearts/heart-broken.png";
import React, { useEffect, useState } from "react";
import "../../index.css";

function Style() {
  const [images, setImages] = useState([
    { id: 1, src: image1, isBookmarked: false, isInfoOpen: false },
    { id: 2, src: image2, isBookmarked: false, isInfoOpen: false },
    { id: 3, src: image3, isBookmarked: false, isInfoOpen: false },
    { id: 4, src: image4, isBookmarked: false, isInfoOpen: false },
    { id: 5, src: image5, isBookmarked: false, isInfoOpen: false },
    { id: 6, src: image6, isBookmarked: false, isInfoOpen: false },
  ]);

  const handleBookmarkClick = (id) => {
    const updatedImages = images.map((image) =>
      image.id === id ? { ...image, isBookmarked: !image.isBookmarked } : image
    );
    setImages(updatedImages);
  };

  const handleImageClick = (id) => {
    const updatedImages = images.map((image) =>
      image.id === id ? { ...image, isInfoOpen: !image.isInfoOpen } : image
    );
    setImages(updatedImages);
  };

  return (
    <div className="image-gallery-container">
      {images.map((image) => (
        <div key={image.id} className="style-card">
          <div
            className="style-image-wrapper"
            onClick={() => handleImageClick(image.id)}
          >
            <img
              className="style-image"
              src={image.src}
              alt={`Image ${image.id}`}
            />
            <button
              className={`heart-icon ${image.isBookmarked ? "hearted" : ""}`}
              onClick={(e) => {
                e.stopPropagation(); // Prevent image click event from triggering
                handleBookmarkClick(image.id);
              }}
            >
              <img className="heart-icon" src={image.isBookmarked ? heartarrow : heartbroken} 
              alt={`Heart ${image.isBookmarked ? "" : ""}`}/>
            </button>
            {image.isInfoOpen && (
              <div className="info-card">
                {/* Information Card Content */}
                <p>Image {image.id} Information</p>
                {/* Add more information as needed */}
                <button onClick={() => handleImageClick(image.id)}>
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Style;

// //WORKING version (keep)
// // function Style() {

// //     const [images, setImages] = useState([
// //       { id: 1, src: image1, isBookmarked: false, isInfoOpen: false },
// //       { id: 2, src: image2, isBookmarked: false, isInfoOpen: false },
// //       { id: 3, src: image3, isBookmarked: false, isInfoOpen: false },
// //       { id: 4, src: image4, isBookmarked: false, isInfoOpen: false },
// //       { id: 5, src: image5, isBookmarked: false, isInfoOpen: false },
// //       { id: 6, src: image6, isBookmarked: false, isInfoOpen: false },
// //       ]);

// //       const handleBookmarkClick = (id) => {
// //         const updatedImages = images.map((image) =>
// //           image.id === id ? { ...image, isBookmarked: !image.isBookmarked } : image
// //         );
// //         setImages(updatedImages);
// //       };

// //       const handleImageClick = (id) => {
// //         const updatedImages = images.map((image) =>
// //           image.id === id ? { ...image, isInfoOpen: !image.isInfoOpen } : image
// //         );
// //         setImages(updatedImages);
// //       };

// //       return (
// //         <div className="image-gallery-container">
// //       {images.map((image) => (
// //         <div key={image.id} className="style-card">
// //           <div className="style-image-wrapper" onClick={() => handleImageClick(image.id)}>
// //             <img className="style-image" src={image.src} alt={`Image ${image.id}`} />
// //             <button
// //               className={`heart-button ${image.isBookmarked ? "hearted" : ""}`}
// //               onClick={(e) => {
// //                 e.stopPropagation(); // Prevent image click event from triggering
// //                 handleBookmarkClick(image.id);
// //               }}
// //             >
// //               {image.isBookmarked ? "Bookmarked" : "Bookmark"}
// //             </button>
// //             {image.isInfoOpen && (
// //               <div className="info-card">
// //                 {/* Information Card Content */}
// //                 <p>Image {image.id} Information</p>
// //                 {/* Add more information as needed */}
// //                 <button onClick={() => handleImageClick(image.id)}>Close</button>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // }
