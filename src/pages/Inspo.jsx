import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";
import React, { useEffect, useState } from "react";

// const InspirationPage = () => {
//   const [spotifyPlaylist, setspotifyPlaylist] = useState([]);

//   const storeToken = (token) => {
//     localStorage.setItem("authToken", token);
//   };

//   const storedToken = localStorage.getItem("authToken");
//   console.log("Token", storedToken);

//   useEffect(() => {
//     // Make the API request to get Instagram posts

//     console.log("Authorization Header:", `Bearer ${storedToken}`);

//     axios
//       .get(`${API_URL}/api/inspiration`, {
//         headers: {
//           Authorization: `Bearer ${storedToken}`, // Make sure storedToken contains a valid JWT
//         },
//       })
//       .then((response) => {
//         setspotifyPlaylist(response.data.playlists.items);
//         console.log("Spotify Data:", response.data.playlists.items);
//       })
//       .catch((error) => {
//         console.error("Error fetching Spotify Data:", error);
//       });
//   }, []);

//   return (
//     <div>
//       <h1>Inspiration Page</h1>
//       {spotifyPlaylist.length > 0 ? (
//         <div>
//           {spotifyPlaylist.slice(0, 5).map((playlist, index) => (
//             <div key={index}>
//               <h2>{playlist.data.name}</h2>
//               {/* <p>Description: {playlist.data.description}</p>
//               <p>Owner: {playlist.data.owner.name}</p> */}
//               <button
//                 onClick={() => {
//                   window.open(playlist.data.uri, "_blank");
//                 }}
//               >
//                 Check on Spotify 🎧
//               </button>
//               <img
//                 src={playlist.data.images.items[0].sources[0].url}
//                 alt={`Playlist ${index}`}
//               />
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>Loading Spotify Playlist ...🥁🎶</p>
//       )}
//     </div>
//   );
// };

// const InspirationPage = () => {
//   const [datascrapper, setDataScrapper] = useState([]);

//   const storeToken = (token) => {
//     localStorage.setItem("authToken", token);
//   };

//   const storedToken = localStorage.getItem("authToken");
//   console.log("Token", storedToken);

//   useEffect(() => {
//     // Make the API request to get Instagram posts

//     console.log("Authorization Header:", `Bearer ${storedToken}`);

//     axios
//       .get(`${API_URL}/api/inspiration`, {
//         headers: {
//           Authorization: `Bearer ${storedToken}`, // Make sure storedToken contains a valid JWT
//         },
//       })
//       .then((response) => {
//         setDataScrapper(response.data);
//         console.log("Scrapped Data:", response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching Scrapped Data:", error);
//       });
//   }, []);

//   return (
//     <div>
//       <h1>Inspiration Page</h1>
//       {datascrapper.htmlInferred && (
//         <div>
//           <img src={datascrapper.htmlInferred.url}/>
//           {/* Include other properties you want to render */}
//         </div>
//       )}
//     </div>
//   );
// };
// export default InspirationPage;
