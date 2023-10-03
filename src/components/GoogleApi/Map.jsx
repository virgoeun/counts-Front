//React way - click info
import React, { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader"; // Import the Loader from the package

function Map() {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [infoWindow, setInfoWindow] = useState(null);

  useEffect(() => {
    const PlaceToFind = {
      lat: 52.5126085,
      lng: 13.3905125
    };

    // Create a new instance of the Loader with your API key
    const loader = new Loader({
      apiKey: "AIzaSyBTqoXLNCSJV4jiZdF9MlC-7lZQAFuYGUU", // Replace with your actual API key
      version: "weekly", // You can specify the version here
    });

    loader.load().then(() => {
      const mapInstance = new window.google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: PlaceToFind
      });
      setMap(mapInstance);

      const iconBase = "/src/assets/hearts/";
      const iconFilename = "heart-sparkle.png";
      const customMarker = {
        url: iconBase + iconFilename,
        scaledSize: new window.google.maps.Size(77, 77)
      };

      const markerInstance = new window.google.maps.Marker({
        position: PlaceToFind,
        icon: customMarker,
        map: mapInstance,
        title: "Here"
      });
      setMarker(markerInstance);

      const infoContentDiv = document.createElement("div");

      const infoContent = `
      <div className="info-content-container" style="background-color: pink; padding-top: 3px; padding-bottom:5px; padding-right:7px; padding-left: 7px;margin-bottom:3px;">
    
      <h4 style="font-size: 19px; color:green;">Little Green Rabbit</h4>
    <p style="font-size: 14px; color:green;"> 🍒 + 🥗 + 🥤+ 💖 = 🥰</p>
    <p style="font-size: 11px;">
      <a href="https://www.instagram.com/littlegreenrabbitberlin/?hl=en" target="_blank" rel="noopener noreferrer" style="color:grey; text-decoration: underline;">
        Visit Instagram
      </a>
    </p>
    <button id="closeButton" style="background-color: white; color: grey; padding: 5px 10px; border: none; cursor: pointer;">Close</button>
  </div>
        `;

      infoContentDiv.innerHTML = infoContent;

      // Append a button to the info content
      const closeButton = infoContentDiv.querySelector("#closeButton");
      closeButton.addEventListener("click", closeInfoWindow);

      const infoWindowInstance = new window.google.maps.InfoWindow({
        content: infoContentDiv
      });

      setInfoWindow(infoWindowInstance);

      // Open the info window immediately
     // infoWindowInstance.open(mapInstance, markerInstance);

      // Function to close the info window
      function closeInfoWindow() {
        infoWindowInstance.close();
      }

      // Attach a click event listener to the marker to open the info window when clicked
      markerInstance.addListener("click", () => {
        infoWindowInstance.open(mapInstance, markerInstance);
      });
    });
  }, []);

  return (
    <div>
      <h1>Map</h1>
      <div id="map" style={{ height: "400px", width: "70%" }}></div>
    </div>
  );
}

export default Map; 


//customized marker version
// import React, { useEffect } from "react";

// function Map() {
//   useEffect(() => {
//     const PlaceToFind = {
//       lat: 52.5126085,
//       lng: 13.3905125
//     };
//     const map = new window.google.maps.Map(
//       document.getElementById("map"),
//       {
//         zoom: 15,
//         center: PlaceToFind
//       }
//     );

//     // Define custom icons for your markers
//     const iconBase = "/src/assets/hearts/";
//     const iconFilename = "heart-sparkle.png";
//     const customMarker = {
//         url: iconBase + iconFilename,
//         scaledSize: new window.google.maps.Size(70, 70), // Set the size here (width, height)
//       };


//     const marker = new window.google.maps.Marker({
//         position: PlaceToFind,
//         icon: customMarker,
//         map: map,
//         title: "I'm here",
//       });
//     }, []);

//   return (
//     <div>
//       <h1>Map</h1>
//       <div id="map" style={{ height: "550px", width: "100%" }}></div>
//     </div>
//   );
// }

// export default Map;



//animation version

// import React, { useEffect } from "react";

// function Map() {
//   useEffect(() => {
//     const PlaceToFind = {
//       lat: 52.5126085,
//       lng: 13.3905125
//     };
//     const map = new window.google.maps.Map(
//       document.getElementById("map"),
//       {
//         zoom: 15,
//         center: PlaceToFind
//       }
//     );

//     // Define custom icons for your markers
//     const iconBase = "/src/assets/hearts/";
//     const iconFilename = "heart-sparkle.png";

//     // Create a marker image with custom size
//     const customMarker = {
//       url: iconBase + iconFilename,
//       scaledSize: new window.google.maps.Size(32, 32), // Set the size here (width, height)
//     };

//     const marker = new window.google.maps.Marker({
//       position: PlaceToFind,
//       icon: customMarker,
//       map: map,
//       title: "I'm here",
//     });

//     // Create an info window content with a link
//     const infoContent = `
//       <div>
//         <h3>Little Green Rabbit</h3>
//         <p>This is a cute place. Visit their website: <a href="https://example.com" target="_blank">Visit Website</a></p>
//       </div>
//     `;

//     // Create an info window
//     const infoWindow = new window.google.maps.InfoWindow({
//       content: infoContent,
//     });

//     // Add a click event listener to open the info window when the marker is clicked
//     marker.addListener("click", () => {
//       infoWindow.open(map, marker);
//     });
//   }, []);

//   return (
//     <div>
//       <h1>Map</h1>
//       <div id="map" style={{ height: "250px", width: "100%" }}></div>
//     </div>
//   );
// }

// export default Map;









