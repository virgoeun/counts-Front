// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import axios from "axios";

// const API_URL = "http://localhost:5005";

// function ProfileCard({ _id, date, sleep, water, stress, sports }) {
//   return (
//     <div key="profile-card" className="Profile-card">
      
//       <p>Date: {date}</p>
//       <p>Sleep Duration (Hours): {sleep.durationInHours}</p>
//       <p>water : {water}</p>
//       <p>stress : {stress}</p>
//       <div> 
//         sports:
//         {sports.map((sport, index) => (
//           <div key={index + _id}>
//             <ul>
//               <li>Date: {sport.date}</li>
//               <li>Duration (Minutes): {sport.durationInMinutes}</li>
//               <li>Level: {sport.level}</li>
//               <li>Type: {sport.type}</li>
//               <li style={{ maxWidth: "400px" }}>
//                 Description: {sport.description}
//               </li>
//             </ul>
//           </div>
//       ))}
//       </div>
//       <Link to="/inspiration">Go to Inspiration Page</Link>
//     </div>
    
//   );
// }

// export default ProfileCard;


// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import axios from "axios";


// const API_URL = "http://localhost:5005";

// function ProfileCard({ _id, date, sleep, water, stress, sports }) {
//   // Sort the sports array by date in descending order (most recent first)
//   const sortedSports = sports.sort((a, b) => new Date(b.date) - new Date(a.date));

//   // Get the most recent sport (first element in the sorted array)
//   const mostRecentSport = sortedSports[0];

//   return (
//     <div key="profile-card" className="Profile-card">
//       <p>Date: {date}</p>
//       <p>Sleep Duration (Hours): {sleep.durationInHours}</p>
//       <p>Water: {water}</p>
//       <p>Stress: {stress}</p>
      
//       <div>
//         <p>Your Recent Moves</p>
//         {mostRecentSport && (
//           <ul>
//             <li>Duration (Minutes): {mostRecentSport.durationInMinutes}</li>
//             <li>Level: {mostRecentSport.level}</li>
//             <li>Type: {mostRecentSport.type}</li>
//             <li style={{ maxWidth: "400px" }}>
//               Description: {mostRecentSport.description}
//             </li>
//           </ul>
//         )}
//       </div>
      
//       <Link to="/inspiration">Go to Inspiration Page</Link>
//     </div>
//   );
// }

// export default ProfileCard;
