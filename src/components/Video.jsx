import ReactPlayer from "react-player";
import { Cloudinary } from "@cloudinary/url-gen";
import React, { useState, useEffect } from "react";
import { AdvancedVideo } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
import { Gravity } from "@cloudinary/url-gen/qualifiers";
import { AutoFocus } from "@cloudinary/url-gen/qualifiers/autoFocus";

//REACT PLAYER VERsion

// function Video() {
//   const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const videoUrls = [
//     "https://www.youtube.com/watch?v=kT9CULSckzw",
//     "https://www.youtube.com/watch?v=J3JP5YK14nU",
//     "https://www.youtube.com/watch?v=s-7lyvblFNI",
//     "https://www.youtube.com/watch?v=-0RiuuwSXFw",
//     "https://www.youtube.com/watch?v=C2HX2pNbUCM",
//     "https://www.youtube.com/watch?v=UxU8OCsNbYY",
//     "https://www.youtube.com/watch?v=5PHZ6Qnc-CQ",
//     "https://www.youtube.com/watch?v=QtE00VP4W3Y",
//     "https://www.youtube.com/watch?v=ufp0rtfAmS0",
//     "https://www.youtube.com/watch?v=lhtaAFG2FDI",
//     "https://www.youtube.com/watch?v=Vr3h5X9kmUo",
//     "https://www.youtube.com/watch?v=YKtDkKUHtPU",
   

//     //  "https://www.youtube.com/watch?v=ssss7V1_eyA",
//     //  "https://www.youtube.com/watch?v=6Pm0Mn0-jYU&t=5s",
//     //  "https://www.youtube.com/watch?v=w6T02g5hnT4&t=12s",
//     //  "https://www.youtube.com/watch?v=o-kMJBWk9E0",
//     //"https://www.youtube.com/watch?v=0g1uOi8K0mI&t=1s",
//   ];

//   const selectRandomVideo = () => {
//     const randomIndex = Math.floor(Math.random() * videoUrls.length);
//     setSelectedVideoUrl(videoUrls[randomIndex]);
//   };

//   useEffect(() => {
//     selectRandomVideo();
//   }, []);

//   return (
//     <div className="container">
//       <h2>Random Video</h2>

//       {/* Render the ReactPlayer component with the selected video URL */}
//       {selectedVideoUrl && (
//         <ReactPlayer
//           url={selectedVideoUrl}
//           playing={isPlaying}
//           controls
//           volume={0.5}
//         />
//       )}

//       {/* Button to select a new random video */}
//       <button onClick={selectRandomVideo}>Change Video</button>
//       <button onClick={() => setIsPlaying(!isPlaying)}>
//         {isPlaying ? "Pause" : "Play"}
//       </button>
//     </div>
//   );
// }

// export default Video;





const Videos = () => {

    const cld = new Cloudinary({
        cloud: {
          cloudName: 'dgslm0j3k'
        }
      });

      const myVideo1 = cld.video('docs/models');
      const myVideo2 = cld.video('docs/healthy');
      const myVideo3 = cld.video('docs/yoga');
      const myVideo4 = cld.video('docs/stress');

    const videos = [
        cld.video('docs/models'),
        cld.video('docs/healthy'),
        cld.video('docs/yoga'),
        cld.video('docs/stress')
      ];


      videos.forEach((video) => {
        video
          .resize(fill().width(1080).height(720).gravity(Gravity.autoGravity().autoFocus(AutoFocus.focusOn(FocusOn.faces()))))
          .roundCorners(byRadius(20));
      });

      const randomIndex = Math.floor(Math.random() * videos.length);
      const selectedVideo = videos[randomIndex];

      myVideo1.resize(fill().width(700).height(500)
      .gravity(Gravity.autoGravity().autoFocus(AutoFocus.focusOn(FocusOn.faces())))) // Crop the video, focusing on the faces.
      .roundCorners(byRadius(20))  // Round the corners.


      return (
        <div>
            <h3>Today's Count Snack for you ❤️ </h3>
          <AdvancedVideo cldVid={myVideo1} controls />
        </div>
      )
    };
export default Videos;



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// const API_URL = "http://localhost:5005";

// const Video = () => {
//       const [datascrapper, setDataScrapper] = useState([]);
//       const [randomVideo, setRandomVideo] = useState(null);

//       const storeToken = (token) => {
//         localStorage.setItem("authToken", token);
//       };

//       const storedToken = localStorage.getItem("authToken");
//       console.log("Token", storedToken);

//       useEffect(() => {
//         // Make the API request to get Instagram posts

//         console.log("Authorization Header:", `Bearer ${storedToken}`);

//         axios
//           .get(`${API_URL}/api/video`, {
//             headers: {
//               Authorization: `Bearer ${storedToken}`, // Make sure storedToken contains a valid JWT
//             },
//           })
//           .then((response) => {
//             setDataScrapper(response.data);
//             console.log("Scrapped Data:", response.data);
//             const randomIndex = Math.floor(
//               Math.random() * response.data.videos.length
//             );
//             setRandomVideo(response.data.videos[randomIndex]);
//           })
//           .catch((error) => {
//             console.error("Error fetching Scrapped Data:", error);
//           });
//       }, []);

//       return (
//         <div>
//           <h1>Inspiration Page</h1>
//           {datascrapper.videos && datascrapper.videos.length > 0 ? (
//             <div>
//               <p>
//                 Playlist URL:{" "}
//                 <a
//                   href={datascrapper.playlistShareUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   {datascrapper.playlistShareUrl}
//                 </a>
//               </p>
//               {randomVideo && (
//                 <div>
//                   <h2>{randomVideo.title}</h2>
//                   <p>{randomVideo.description}</p>
//                   <p>Last Updated: {randomVideo.lastUpdated}</p>
//                   <iframe
//                     width="560"
//                     height="315"
//                     src={`https://www.youtube.com/embed/${randomVideo.videoId}`}
//                     title={randomVideo.title}
//                     frameBorder="0"
//                     allowFullScreen
//                   ></iframe>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <p>Loading Data...</p>
//           )}
//         </div>
//       );
//     };
