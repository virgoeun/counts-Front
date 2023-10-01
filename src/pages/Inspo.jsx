import React, { useEffect, useState } from "react";
import axios from "axios";
const API_URL = "http://localhost:5005";

// const InspirationPage = () => {
//   const [data, setData] = useState(null);
//   const [storedToken, setStoredToken] = useState(localStorage.getItem("authToken"));
//   const [loading, setLoading] = useState(true);

//   // Define the data source based on the route parameter
//   const dataSource = window.location.pathname.split("/").pop();
//   //const dataSource = req.params.dataSource;

//   useEffect(() => {
//     // Make the API request based on the data source parameter
//     axios
//       .get(`${API_URL}/api/inspiration/${dataSource}`, {
//         headers: {
//           Authorization: `Bearer ${storedToken}`,
//         },
//       })
//       .then((response) => {
//         setData(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//         setLoading(false);
//       });
//   }, [dataSource, storedToken]);

//   return (
//     <div>
//       <h1>Inspiration Page</h1>
//       {loading && <p>Loading Data...</p>}
//       {data && dataSource === "spotify" && (
//         <RenderSpotifyData data={data} />
//       )}
//       {data && dataSource === "youtube" && (
//         <RenderYoutubeData data={data} />
//       )}
//       {data && dataSource === "recipes" && (
//         <RenderRecipesData data={data} />
//       )}
//     </div>
//   );
// };

// const RenderSpotifyData = ({ data }) => {
//     const { playlists } = data;
//     // Render Spotify data here
//   };
  
//   const RenderYoutubeData = ({ data }) => {
//     const { videos } = data;
//     // Render YouTube data here
//   };
  
//   const RenderRecipesData = ({ data }) => {
//     const { recipes } = data;
//     // Render recipe data here
//   };
  
//   export default InspirationPage;


// const InspirationPage = () => {
//   const [spotifyPlaylists, setSpotifyPlaylists] = useState([]);
//   const [randomPlaylist, setRandomPlaylist] = useState(null);
//   const [datascrapper, setDataScrapper] = useState([]);
//   const [randomVideo, setRandomVideo] = useState(null);

//   const storeToken = (token) => {
//     localStorage.setItem("authToken", token);
//   };

//   const storedToken = localStorage.getItem("authToken");
//   console.log("Token", storedToken);

//   useEffect(() => {
//     // Make both API requests in parallel
//     const fetchSpotifyData = axios.get(`${API_URL}/api/inspiration/spotify`, {
//       headers: {
//         Authorization: `Bearer ${storedToken}`,
//       },
//     });

//     const fetchDataScraper = axios.get(`${API_URL}/api/inspiration/youtube`, {
//       headers: {
//         Authorization: `Bearer ${storedToken}`,
//       },
//     });

//     Promise.all([fetchSpotifyData, fetchDataScraper])
//       .then((responses) => {
//         const spotifyData = responses[0].data.playlists.items;
//         const dataScraperData = responses[1].data;

//         setSpotifyPlaylists(spotifyData);
//         setDataScrapper(dataScraperData);

//         // Randomly select a playlist from spotifyData
//         if (spotifyData.length > 0) {
//           const randomIndex = Math.floor(Math.random() * spotifyData.length);
//           setRandomPlaylist(spotifyData[randomIndex]);
//         }

//         // Randomly select a video from dataScraperData
//         if (dataScraperData.videos && dataScraperData.videos.length > 0) {
//           const randomIndex = Math.floor(
//             Math.random() * dataScraperData.videos.length
//           );
//           setRandomVideo(dataScraperData.videos[randomIndex]);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   }, [storedToken]);

//   return (
//     <div>
//       <h1>Inspiration Page</h1>

//       {/* Display a random Spotify playlist */}
//       {randomPlaylist ? (
//         <div>
//           <h2>{randomPlaylist.data.name}</h2>
//           <button
//             onClick={() => {
//               window.open(randomPlaylist.data.uri, "_blank");
//             }}
//           >
//             Check on Spotify 🎧
//           </button>
//           <img
//             src={randomPlaylist.data.images.items[0].sources[0].url}
//             alt={`Playlist`}
//           />
//         </div>
//       ) : (
//         <p>Loading Spotify Playlist ...🥁🎶</p>
//       )}

//       {/* Display data from dataScraper */}
//       {datascrapper.videos && datascrapper.videos.length > 0 ? (
//         <div>
//           <p>
//             Playlist URL:{" "}
//             <a
//               href={datascrapper.playlistShareUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               {datascrapper.playlistShareUrl}
//             </a>
//           </p>
//           {randomVideo && (
//             <div>
//               <h2>{randomVideo.title}</h2>
//               <p>{randomVideo.description}</p>
//               <p>Last Updated: {randomVideo.lastUpdated}</p>
//               <iframe
//                 width="560"
//                 height="315"
//                 src={`https://www.youtube.com/embed/${randomVideo.videoId}`}
//                 title={randomVideo.title}
//                 frameBorder="0"
//                 allowFullScreen
//               ></iframe>
//             </div>
//           )}
//         </div>
//       ) : (
//         <p>Loading Data...</p>
//       )}
//     </div>
//   );
// };

// export default InspirationPage;




// const InspirationPage = () => {
//   const [datascrapper, setDataScrapper] = useState([]);
//   const [randomVideo, setRandomVideo] = useState(null);

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
//         const randomIndex = Math.floor(
//           Math.random() * response.data.videos.length
//         );
//         setRandomVideo(response.data.videos[randomIndex]);
//       })
//       .catch((error) => {
//         console.error("Error fetching Scrapped Data:", error);
//       });
//   }, []);

//   return (
//     <div>
//       <h1>Inspiration Page</h1>
//       {datascrapper.videos && datascrapper.videos.length > 0 ? (
//         <div>
//           <p>
//             Playlist URL:{" "}
//             <a
//               href={datascrapper.playlistShareUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               {datascrapper.playlistShareUrl}
//             </a>
//           </p>
//           {randomVideo && (
//             <div>
//               <h2>{randomVideo.title}</h2>
//               <p>{randomVideo.description}</p>
//               <p>Last Updated: {randomVideo.lastUpdated}</p>
//               <iframe
//                 width="560"
//                 height="315"
//                 src={`https://www.youtube.com/embed/${randomVideo.videoId}`}
//                 title={randomVideo.title}
//                 frameBorder="0"
//                 allowFullScreen
//               ></iframe>
//             </div>
//           )}
//         </div>
//       ) : (
//         <p>Loading Data...</p>
//       )}
//     </div>
//   );
// };




