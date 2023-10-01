//import ReactPlayer from "react-player";
import {Cloudinary} from "@cloudinary/url-gen";
import React, { useState, useEffect } from "react";
import {AdvancedVideo} from '@cloudinary/react';
import {fill} from "@cloudinary/url-gen/actions/resize";
import {byRadius} from "@cloudinary/url-gen/actions/roundCorners";
import {FocusOn} from "@cloudinary/url-gen/qualifiers/focusOn";
import {Gravity} from "@cloudinary/url-gen/qualifiers";
import {AutoFocus} from "@cloudinary/url-gen/qualifiers/autoFocus";

const Videos = () => {

    const cld = new Cloudinary({
        cloud: {
          cloudName: 'dgslm0j3k'
        }
      }); 
    
      // Use the video with public ID, 'docs/walking_talking'.
      const myVideo1 = cld.video('docs/models');
      const myVideo2 = cld.video('docs/mindful');
      const myVideo3 = cld.video('docs/yoga');
      const myVideo4 = cld.video('docs/stress');

    // const videos = [
    //     cld.video('docs/models'),
    //     cld.video('docs/mindful'),
    //     cld.video('docs/yoga'),
    //     cld.video('docs/stress')
    //   ];

      // Apply the transformation.

    //   videos.forEach((video) => {
    //     video
    //       .resize(fill().width(1080).height(720).gravity(Gravity.autoGravity().autoFocus(AutoFocus.focusOn(FocusOn.faces()))))
    //       .roundCorners(byRadius(20));
    //   });

    //   const randomIndex = Math.floor(Math.random() * videos.length);
    //   const selectedVideo = videos[randomIndex];

    myVideo3.resize(fill().width(650).height(400)
      .gravity(Gravity.autoGravity().autoFocus(AutoFocus.focusOn(FocusOn.faces())))) // Crop the video, focusing on the faces.
      .roundCorners(byRadius(20))  // Round the corners.
   
    
      // Render the transformed video in a React component.
      return (
        <div>
            <h3>Today's Count Snack for you ❤️ </h3>
          <AdvancedVideo cldVid={myVideo3} controls />
        </div>
      )
    };
export default Videos;

//   const videoRef = useRef();
//   const cloudinaryRef = useRef();
//   const playerRef = useRef();

//   // Store the Cloudinary window instance to a ref when the page renders

//   useEffect(() => {
//     if ( cloudinaryRef.current ) return;

//     cloudinaryRef.current = window.cloudinary;

//     playerRef.current = cloudinaryRef.current.videoPlayer(videoRef.current, {
//       cloud_name: "counts-project",
//     });
//   }, []);

//   return (
//     <div style={{ width: '100%', aspectRatio: `${props.width} / ${props.height}`}}>
//       <video
//         ref={videoRef}
//         id={id}
//         className="cld-video-player cld-fluid"
//         controls
//         autoPlay
//         data-cld-public-id={publicId}
//         {...props}
//       />
//     </div>
//   )
// }





// function Video() {
//   const[selectedVideoUrl, setSelectedVideoUrl] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const videoUrls = [
//     "https://www.youtube.com/watch?v=jwWpTAXu-Sg&list=PLLQHhQnYADNkQ2FYEYBMSl-g3T0xLeas8&index=5",
//     "https://www.youtube.com/watch?v=ssss7V1_eyA&list=PLLQHhQnYADNkQ2FYEYBMSl-g3T0xLeas8",
//      "https://www.youtube.com/watch?v=zdz8c9a-rDo&list=PLLQHhQnYADNkQ2FYEYBMSl-g3T0xLeas8&index=2",
//      "https://www.youtube.com/watch?v=anWff1mZ2tY&list=PLLQHhQnYADNkQ2FYEYBMSl-g3T0xLeas8&index=3",
//      "https://www.youtube.com/watch?v=0g1uOi8K0mI&list=PLLQHhQnYADNkQ2FYEYBMSl-g3T0xLeas8&index=4"
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
//         <ReactPlayer url={selectedVideoUrl} playing={isPlaying} controls volume={0.5} />
//       )}

//       {/* Button to select a new random video */}
//       <button onClick={selectRandomVideo}>Change Video</button>
//       <button onClick={() => setIsPlaying(!isPlaying)}>
//         {isPlaying ? 'Pause' : 'Play'}
//       </button>
//     </div>
//   );
// }

// export default Video;

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


