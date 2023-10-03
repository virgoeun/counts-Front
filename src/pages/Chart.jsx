import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import styles for date picker

import CustomTooltip from "../components/Charts/CustomToolTip";

export default function Chart() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  //const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [waterData, setWaterData] = useState([]);
  const [sportsDurationData, setSportsDurationData] = useState([]);
  const [sleepData, setSleepData] = useState([]);


  const[waterFilteredData, setWaterFilteredData] = useState([]);
  const[sleepFilteredData, setSleepFilteredData] = useState([]);
const[sportsFilteredData, setSportsFilteredData] = useState({});

  const API_URL = "http://localhost:5005";

  // this one works only for ARRAY! (not object -> that's why sports data should be turned into ARRAY: check the below "sportsDurationChartData" function)
  const filterDataByDateRange = (data, startDate, endDate) => {
    return data.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= startDate && itemDate <= endDate;
    });
  };
  // const filterSportsDataByDateRange = (data, startDate, endDate) => {
  //   const filteredData = {};
  //   for (const date in data) {
  //     if (data.hasOwnProperty(date)) {
  //       // Convert the date key to a string in "YYYY-MM-DD" format
  //       const dateString = date.split('T')[0];
  //       console.log("dateString", dateString)
  
  //       const itemDate = new Date(dateString);
  //       if (itemDate >= startDate && itemDate <= endDate) {
  //         filteredData[dateString] = data[date];
  //       }
  //     }
  //   }
  //   console.log("Sportsfiltered DATA", filteredData);
  //   return filteredData;
  // };
  
  const getActivity = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/api/checkin`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const data = response.data;

        // Extract water data
        const waterDataRetrieved = data.map((item) => ({
          date: item.date.split("T")[0],
          water: item.water ? parseInt(item.water) : 0,
        }));

        // Extract sports duration data and aggregate it
        const sportsDurationDataRetrieved = data.reduce((accumulator, item) => {
          const date = item.date.split("T")[0];

          if (item.sports) {
            item.sports.forEach((sport) => {
              if (sport.durationInMinutes) {
                const minutes = sport.durationInMinutes;

                if (accumulator[date]) {
                  accumulator[date] += minutes;
                } else {
                  accumulator[date] = minutes;
                }
              }
            });
          }

          return accumulator;
        }, {});

        // Extract sleep data
        const sleepDataRetrieved = data.map((item) => ({
          date: item.date.split("T")[0],
          sleep: item.sleep ? parseFloat(item.sleep) : 0,
        }));

        // Convert sports duration data to an array and format hours with one decimal place
        const sportsDurationChartData = Object.keys(sportsDurationDataRetrieved).map((date) => ({
          date,
          minutes: sportsDurationDataRetrieved[date],
        }));
        console.log("sports OBJECT", sportsDurationDataRetrieved)
        console.log("sports ARRAY", sportsDurationChartData)

        setWaterData(waterDataRetrieved);
        setSportsDurationData(sportsDurationChartData );
        setSleepData(sleepDataRetrieved);
        setIsLoaded(true);
      })
      .catch((error) => {
        setIsLoaded(true);
        setError(error);
      });
  };

  const handleRetrieveData = () => {
    // Call getActivity to retrieve and set data
    getActivity();
  };

  useEffect(() => {
    // Filter data when startDate or endDate change
    const filteredWaterData = filterDataByDateRange(waterData, startDate, endDate);
    setWaterFilteredData(filteredWaterData);

    const filteredSleepData = filterDataByDateRange(sleepData, startDate, endDate);
    setSleepFilteredData(filteredSleepData);

    const filteredSportsData = filterDataByDateRange(sportsDurationData, startDate, endDate);
    setSportsFilteredData(filteredSportsData);


  }, [startDate, endDate, sleepData, waterData, sportsDurationData]);

  return (
    <div>
      {/* Calendar Day-Picker */}
      <div>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Start Date"
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          placeholderText="End Date"
        />
        <button onClick={handleRetrieveData}>Retrieve Data</button>
      </div>

      {/* Display Filtered Data */}
      {isLoaded ? (
        <>
          {/* Water Consumption Chart */}
          <div>
            <h2>Water Consumption Chart</h2>
            <LineChart
              width={800}
              height={400}
              data={waterFilteredData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid stroke="none" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line type="monotone" dataKey="water" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </div>

          {/* Sports Duration Chart */}
          <div>
            <h2>Sports Duration Chart (minutes)</h2>
            <LineChart width={600} height={300} data={sportsFilteredData}>
              <CartesianGrid stroke="none" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="minutes"
                name="Sports Duration (minutes)"
                stroke="#82ca9d"
              />
            </LineChart>
          </div>

          {/* Sleep Chart */}
          <div>
            <h2>Sleep Chart</h2>
            <LineChart width={600} height={300} data={sleepFilteredData}>
              <CartesianGrid stroke="none" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="sleep"
                name="Sleep (hours)"
                stroke="#ff0000" // Choose an appropriate color
              />
            </LineChart>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}



//***old version works */
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   CartesianGrid,
//   ResponsiveContainer,
// } from "recharts";

// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css"; // Import styles for date picker

// import CustomTooltip from "../components/Charts/CustomToolTip";

// export default function Chart() {
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [filteredData, setFilteredData] = useState([]);
//   const [error, setError] = useState(null);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [waterData, setWaterData] = useState([]);
//   const [sportsDurationData, setSportsDurationData] = useState([]);
//   const [sleepData, setSleepData] = useState([]);

//   const [filteredWaterData, setFilteredWaterData] = useState([]);
// const [filteredSportsData, setFilteredSportsData] = useState([]);
// const [filteredSleepData, setFilteredSleepData] = useState([]);

//   const API_URL = "http://localhost:5005";

//   const filterDataByDateRange = (data, startDate, endDate) => {
//     return data.filter((item) => {
//       const itemDate = new Date(item.date);
//       return itemDate >= startDate && itemDate <= endDate;
//     });
//   };

//   const getActivity = () => {
//     const storedToken = localStorage.getItem("authToken");

//     axios
//       .get(`${API_URL}/api/checkin`, {
//         headers: { Authorization: `Bearer ${storedToken}` },
//       })
//       .then((response) => {
//         const data = response.data;

//         // Extract water data
//         const waterData = data.map((item) => ({
//           date: item.date.split("T")[0],
//           water: item.water ? parseInt(item.water) : 0,
//         }));

//         // Extract sports duration data and aggregate it
//         const sportsDurationData = data.reduce((accumulator, item) => {
//           const date = item.date.split("T")[0];

//           if (item.sports) {
//             item.sports.forEach((sport) => {
//               if (sport.durationInMinutes) {
//                 const minutes = sport.durationInMinutes;

//                 if (accumulator[date]) {
//                   accumulator[date] += minutes;
//                 } else {
//                   accumulator[date] = minutes;
//                 }
//               }
//             });
//           }

//           return accumulator;
//         }, {});

//         // Convert sports duration data to an array and format hours with one decimal place
//         const sportsDurationChartData = Object.keys(sportsDurationData).map(
//           (date) => ({
//             date,
//             minutes: sportsDurationData[date],
//           })
//         );

//         // Extract sleep data
//         const sleepData = data.map((item) => ({
//           date: item.date.split("T")[0],
//           sleep: item.sleep ? parseFloat(item.sleep) : 0,
//         }));

//         setWaterData(waterData);
//         setSportsDurationData(sportsDurationData);
//         setSleepData(sleepData);
//         setIsLoaded(true);
//       })
//       .catch((error) => {
//         setIsLoaded(true);
//         setError(error);
//       });
//   };

//   const handleRetrieveData = () => {
//     // Call getActivity to retrieve and set data
//     getActivity();
//   };
  
//   useEffect(() => {
//     // Filter water data by date range
//     const filteredWater = filterDataByDateRange(waterData, startDate, endDate);
//     setFilteredWaterData(filteredWater);
  
//     // Filter sports duration data by date range
//     const filteredSports = filterDataByDateRange(
//       sportsDurationData,
//       startDate,
//       endDate
//     );
//     setFilteredSportsData(filteredSports);
  
//     // Filter sleep data by date range
//     const filteredSleep = filterDataByDateRange(sleepData, startDate, endDate);
//     setFilteredSleepData(filteredSleep);
    
//   }, [startDate, endDate, waterData, sleepData, sportsDurationData]);

//   return (
//     <div>
//       {isLoaded ? (
//         <>
//           {/* Water Consumption Chart */}
//           <div>
//             <h2>Water Consumption Chart</h2>
//             <LineChart
//               width={800}
//               height={400}
//               data={waterData}
//               margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//             >
//               <CartesianGrid stroke="none" />
//               <XAxis dataKey="date" />
//               <YAxis />
//               <Tooltip content={<CustomTooltip />} />
//               <Legend />
//               <Line
//                 type="monotone"
//                 dataKey="water"
//                 stroke="#8884d8"
//                 activeDot={{ r: 8 }}
//               />
//             </LineChart>
//           </div>

//           {/* Stress Level Chart */}
//           <div>
//             <h2>Stress Level Chart</h2>
//             <LineChart width={600} height={300} data={stressData}>
//               <CartesianGrid stroke="none" />
//               <XAxis dataKey="date" />
//               <YAxis />
//               <Tooltip content={<CustomTooltip />} />
//               <Legend />
//               <Line
//                 type="monotone"
//                 dataKey="stress"
//                 name="Stress Level"
//                 stroke="#ff0000" // Choose an appropriate color
//               />
//             </LineChart>
//           </div>

//           {/* Sports Duration Chart */}
//           <div>
//             <h2>Sports Duration Chart (minutes)</h2>
//             <LineChart width={600} height={300} data={sportsDurationData}>
//               <CartesianGrid stroke="none" />
//               {/* <CartesianGrid stroke="gray" strokeDasharray="5 5" /> */}
//               <XAxis dataKey="date" />
//               <YAxis />
//               <Tooltip content={<CustomTooltip />} />
//               <Legend />
//               <Line
//                 type="monotone"
//                 dataKey="minutes"
//                 name="Sports Duration (minutes)"
//                 stroke="#82ca9d"
//               />
//             </LineChart>
//           </div>
//         </>
//       ) : (
//         <p>Loading...</p>
//       )}
//       {error && <p>Error: {error.message}</p>}
//     </div>
//   );
// }

//********** new version

// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   CartesianGrid,
//   ResponsiveContainer,
// } from "recharts";

// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css"; // Import styles for date picker

// import CustomTooltip from "../components/Charts/CustomToolTip";

// export default function Chart() {
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [filteredWaterData, setFilteredWaterData] = useState([]);
//   const [filteredSportsData, setFilteredSportsData] = useState([]);
//   const [filteredSleepData, setFilteredSleepData] = useState([]);
//   const [error, setError] = useState(null);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [waterData, setWaterData] = useState([]);
//   const [sportsDurationData, setSportsDurationData] = useState([]);
//   const [sleepData, setSleepData] = useState([]);

//   const API_URL = "http://localhost:5005";

//   const filterDataByDateRange = (data, startDate, endDate) => {
//     return data.filter((item) => {
//       const itemDate = new Date(item.date);
//       return itemDate >= startDate && itemDate <= endDate;
//     });
//   };

//   const getActivity = () => {
//     const storedToken = localStorage.getItem("authToken");

//     axios
//       .get(`${API_URL}/api/checkin`, {
//         headers: { Authorization: `Bearer ${storedToken}` },
//       })
//       .then((response) => {
//         const data = response.data;

//         const waterData = data.map((item) => ({
//           date: item.date.split("T")[0],
//           water: item.water ? parseInt(item.water) : 0,
//         }));

//         const sportsDurationData = data.reduce((accumulator, item) => {
//           const date = item.date.split("T")[0];

//           if (item.sports) {
//             item.sports.forEach((sport) => {
//               if (sport.durationInMinutes) {
//                 const minutes = sport.durationInMinutes;

//                 if (accumulator[date]) {
//                   accumulator[date] += minutes;
//                 } else {
//                   accumulator[date] = minutes;
//                 }
//               }
//             });
//           }

//           return accumulator;
//         }, {});

//         const sleepData = data.map((item) => ({
//           date: item.date.split("T")[0],
//           sleep: item.sleep ? parseFloat(item.sleep) : 0,
//         }));

//         setWaterData(waterData);
//         setSportsDurationData(sportsDurationData);
//         setSleepData(sleepData);
//         setIsLoaded(true);
//       })
//       .catch((error) => {
//         setIsLoaded(true);
//         setError(error);
//       });
//   };

//   const handleRetrieveData = () => {
//     getActivity();
//   };

//   useEffect(() => {
//     // Filter data by date range when start or end date changes
//     const filteredWater = filterDataByDateRange(waterData, startDate, endDate);
//     setFilteredWaterData(filteredWater);

//     const filteredSports = filterDataByDateRange(
//       sportsDurationData,
//       startDate,
//       endDate
//     );
//     setFilteredSportsData(filteredSports);

//     const filteredSleep = filterDataByDateRange(sleepData, startDate, endDate);
//     setFilteredSleepData(filteredSleep);
//   }, [startDate, endDate, waterData, sleepData, sportsDurationData]);



//   return (
//     <div>
//       {/* Calendar Day-Picker */}
//       <div>
//         <DatePicker
//           selected={startDate}
//           onChange={(date) => setStartDate(date)}
//           selectsStart
//           startDate={startDate}
//           endDate={endDate}
//           placeholderText="Start Date"
//         />
//         <DatePicker
//           selected={endDate}
//           onChange={(date) => setEndDate(date)}
//           selectsEnd
//           startDate={startDate}
//           endDate={endDate}
//           minDate={startDate}
//           placeholderText="End Date"
//         />
//         <button onClick={handleRetrieveData}>Retrieve Data</button>
//       </div>

//       {/* Display Filtered Data */}
//       {isLoaded ? (
//         <>
//           {/* Water Consumption Chart */}
//           <div>
//             <h2>Water Consumption Chart</h2>
//             <LineChart
//               width={800}
//               height={400}
//               data={filteredWaterData}
//               margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//             >
//               <CartesianGrid stroke="none" />
//               <XAxis dataKey="date" />
//               <YAxis />
//               <Tooltip content={<CustomTooltip />} />
//               <Legend />
//               <Line
//                 type="monotone"
//                 dataKey="water"
//                 stroke="#8884d8"
//                 activeDot={{ r: 8 }}
//               />
//             </LineChart>
//           </div>

//           {/* Sports Duration Chart */}
//           <div>
//             <h2>Sports Duration Chart (minutes)</h2>
//             <LineChart width={600} height={300} data={filteredSportsData}>
//               <CartesianGrid stroke="none" />
//               <XAxis dataKey="date" />
//               <YAxis />
//               <Tooltip content={<CustomTooltip />} />
//               <Legend />
//               <Line
//                 type="monotone"
//                 dataKey="minutes"
//                 name="Sports Duration (minutes)"
//                 stroke="#82ca9d"
//               />
//             </LineChart>
//           </div>

//           {/* Sleep Chart */}
//           <div>
//             <h2>Sleep Chart</h2>
//             <LineChart width={600} height={300} data={filteredSleepData}>
//               <CartesianGrid stroke="none" />
//               <XAxis dataKey="date" />
//               <YAxis />
//               <Tooltip content={<CustomTooltip />} />
//               <Legend />
//               <Line
//                 type="monotone"
//                 dataKey="sleep"
//                 name="Sleep (hours)"
//                 stroke="#ff0000" // Choose an appropriate color
//               />
//             </LineChart>
//           </div>
//         </>
//       ) : (
//         <p>Loading...</p>
//       )}
//       {error && <p>Error: {error.message}</p>}
//     </div>
//   );
// }

//original data structure (only chart) before Datepicker
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   CartesianGrid,
//   ResponsiveContainer,
// } from "recharts";

// import CustomTooltip from "../components/Charts/CustomToolTip";

// export default function Chart() {
//   const [error, setError] = useState(null);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [waterData, setWaterData] = useState([]);
//   const [sportsDurationData, setSportsDurationData] = useState([]);
//   const [stressData, setStressData] = useState([]);

//   const API_URL = "http://localhost:5005";

//   const getActivity = () => {
//     const storedToken = localStorage.getItem("authToken");

//     axios
//       .get(`${API_URL}/api/checkin`, {
//         headers: { Authorization: `Bearer ${storedToken}` },
//       })
//       .then((response) => {
//         const data = response.data;

//         // Extract water data
//         const waterData = data.map((item) => ({
//           date: item.date.split("T")[0],
//           water: item.water ? parseInt(item.water) : 0,
//         }));

//         const stressData = data.map((item) => ({
//           date: item.date.split("T")[0],
//           stress: item.stress ? parseInt(item.stress) : 0,
//         }));

//         // Extract sports duration data and aggregate it
//         const sportsDurationData = data.reduce((accumulator, item) => {
//           const date = item.date.split("T")[0];

//           if (item.sports) {
//             item.sports.forEach((sport) => {
//               if (sport.durationInMinutes) {
//                 const minutes = sport.durationInMinutes;

//                 if (accumulator[date]) {
//                   accumulator[date] += minutes;
//                 } else {
//                   accumulator[date] = minutes;
//                 }
//               }
//             });
//           }

//           return accumulator;
//         }, {});

//         // Convert sports duration data to an array and format hours with one decimal place
//         const sportsDurationChartData = Object.keys(sportsDurationData).map(
//           (date) => ({
//             date,
//             minutes: sportsDurationData[date],
//           })
//         );

//         setWaterData(waterData);
//         setSportsDurationData(sportsDurationChartData);
//         setStressData(stressData);
//         setIsLoaded(true);
//       })
//       .catch((error) => {
//         setIsLoaded(true);
//         setError(error);
//       });
//   };

//   useEffect(() => {
//     getActivity();
//   }, []);

//   return (
//     <div>
//       {isLoaded ? (
//         <>
//           {/* Water Consumption Chart */}
//           <div>
//             <h2>Water Consumption Chart</h2>
//             <LineChart
//               width={800}
//               height={400}
//               data={waterData}
//               margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//             >
//               <CartesianGrid stroke="none" />
//               <XAxis dataKey="date" />
//               <YAxis />
//               <Tooltip content={<CustomTooltip />} />
//               <Legend />
//               <Line
//                 type="monotone"
//                 dataKey="water"
//                 stroke="#8884d8"
//                 activeDot={{ r: 8 }}
//               />
//             </LineChart>
//           </div>

//           {/* Stress Level Chart */}
//           <div>
//             <h2>Stress Level Chart</h2>
//             <LineChart width={600} height={300} data={stressData}>
//               <CartesianGrid stroke="none" />
//               <XAxis dataKey="date" />
//               <YAxis />
//               <Tooltip content={<CustomTooltip />} />
//               <Legend />
//               <Line
//                 type="monotone"
//                 dataKey="stress"
//                 name="Stress Level"
//                 stroke="#ff0000" // Choose an appropriate color
//               />
//             </LineChart>
//           </div>

//           {/* Sports Duration Chart */}
//           <div>
//             <h2>Sports Duration Chart (minutes)</h2>
//             <LineChart width={600} height={300} data={sportsDurationData}>
//               <CartesianGrid stroke="none" />
//               {/* <CartesianGrid stroke="gray" strokeDasharray="5 5" /> */}
//               <XAxis dataKey="date" />
//               <YAxis />
//               <Tooltip content={<CustomTooltip />} />
//               <Legend />
//               <Line
//                 type="monotone"
//                 dataKey="minutes"
//                 name="Sports Duration (minutes)"
//                 stroke="#82ca9d"
//               />
//             </LineChart>
//           </div>
//         </>
//       ) : (
//         <p>Loading...</p>
//       )}
//       {error && <p>Error: {error.message}</p>}
//     </div>
//   );
// }







// import axios from "axios";
// //import { LineChart, Line, Tooltip } from "recharts";
// import React, { useEffect, useState } from "react";

// export default function Chart() {
//   const [error, setError] = useState(null);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [items, setItems] = useState([]);
//   const [waterData, setWaterData] = useState({});
//   const [stressData, setStressData] = useState({});
//   const [sportsDurationData, setSportsDurationData] = useState({});

//   const API_URL = "http://localhost:5005";

//   const getActivity = () => {
//     // Get the token from the localStorage
//     const storedToken = localStorage.getItem("authToken");
//     console.log("StoredToken", storedToken);

//     // Send the token through the request "Authorization" Headers
//     axios
//       .get(`${API_URL}/api/checkin`, {
//         headers: { Authorization: `Bearer ${storedToken}` },
//       })
//       .then((response) => {
//         setItems(response.data);

//         // Extract water, stress, and sports duration data along with date
//         const waterData = [];
//         const stressData = [];
//    const sportsDurationData=[];

//         console.log("waterData", waterData);
//         console.log("stressData", stressData);
//         console.log("sportsData", sportsDurationData);

//         response.data.forEach((item) => {
//           const date = item.date.split("T")[0];
//           console.log("Date:", date)

//           // Aggregate water data for the same day
//           if (item.water) {
//             if (waterData[date]) {
//               waterData[date] += parseInt(item.water);
//             } else {
//               waterData[date] = parseInt(item.water);
//             }
//           }

//           // Aggregate stress data for the same day
//           if (item.stress) {
//             if (stressData[date]) {
//               // You may need to implement logic to combine stress values properly
//               // This is just a simple example
//               stressData[date] += item.stress;
//             } else { // if not exsits - means this is the 1st entry
//               stressData[date] = item.stress;
//             }
//           }

//           // Aggregate sports duration data for the same day
//           if (item.sports) {
//             item.sports.forEach((sport) => {
//               if (sport.durationInMinutes) {
//                 if (sportsDurationData[date]) {
//                   sportsDurationData[date] += parseInt(sport.durationInMinutes);
//                 } else {
//                   sportsDurationData[date] = parseInt(sport.durationInMinutes);
//                 }
//               }
//             });
//           }

//         });

//         setWaterData(waterData);
//         setStressData(stressData);
//         setSportsDurationData(sportsDurationData);

//         console.log("Sports Duration Data:", sportsDurationData);

//         setIsLoaded(true);
//       })
//       .catch((error) => {
//         setIsLoaded(true);
//         setError(error);
//       });
//   };

//   useEffect(() => {
//     getActivity();
//   }, []);

//   return (
//     <div>
//       {isLoaded ? (
//         <>
//           {/* Render your charts or display data as needed */}
//           <div>
//             <h2>Water Data</h2>
//             <ul>
//               {Object.keys(waterData).map((date) => (
//                 <li key={date}>
//                   Date: {date}, Water V(liters): {waterData[date]}
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div>
//             <h2>Stress Level Data</h2>
//             <ul>
//               {Object.keys(stressData).map((date) => (
//                 <li key={date}>
//                   Date: {date}, Stress V(level): {stressData[date]}
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div>
//             <h2>Sports Duration Data</h2>
//             <ul>
//               {Object.keys(sportsDurationData).map((date) => (
//                 <li key={date}>
//                   Date: {date}, Sports Duration V(hours): {sportsDurationData[date]}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </>
//       ) : (
//         <p>Loading...</p>
//       )}
//       {error && <p>Error: {error.message}</p>}
//     </div>
//   );
// }

// import React from 'react';
// import { useEffect, useState } from "react";
// import { LineChart, Line } from 'recharts';

// export default function Chart() {
// const [error, setError] = useState(null);
// const [isLoaded, setIsLoaded] = useState(false);
// const [items, setItems] = useState([]);
// const data = [];

// const API_URL = "http://localhost:5005";

// useEffect(() => {
// fetch("https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=IBM&apikey=" + "VNXSEST4EE5ATS25")
// .then(res => res.json())
// .then(
// (result) => {
// for (var instance in result["Weekly Time Series"] ) {
// var mydata = (result["Weekly Time Series"][instance])
// mydata.date= instance
// data.push(mydata)
// }
// setItems(data.reverse())
// },
// Note: it's important to handle errors here
// instead of a catch() block so that we don't swallow
// exceptions from actual bugs in components.
// (error) => {
// setIsLoaded(true);
// setError(error);
// }
// )
// }, [])
// return (
// <div>
// <LineChart width={500} height={250} margin={{ top: 150, right: 30, left: 20, bottom: 5 }} data={items}>
// <Line dot={false}  type="monotone" dataKey="1. open" stroke="rgb(0,200,5)" yAxisId="100" />
// </LineChart>
// </div>
// )
// }

// JSON stringfy format
// import axios from "axios";
// import React, { useEffect, useState } from "react";

// export default function Chart() {
//   const [error, setError] = useState(null);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [items, setItems] = useState([]);
//   const [waterDataJson, setWaterDataJson] = useState([]); // Updated state variables
//   const [stressDataJson, setStressDataJson] = useState([]);
//   const [sportsDurationDataJson, setSportsDurationDataJson] = useState([]);

//   const API_URL = "http://localhost:5005";

//   const getActivity = () => {
//     const storedToken = localStorage.getItem("authToken");

//     axios
//       .get(`${API_URL}/api/checkin`, {
//         headers: { Authorization: `Bearer ${storedToken}` },
//       })
//       .then((response) => {
//         setItems(response.data);

//         const waterData = [];
//         const stressData = [];
//         const sportsDurationData = [];

//         response.data.forEach((item) => {
//           const date = item.date.split("T")[0];

//           if (item.water) {
//             if (waterData[date]) {
//               waterData[date] += parseInt(item.water);
//             } else {
//               waterData[date] = parseInt(item.water);
//             }
//           }

//           if (item.stress) {
//             if (stressData[date]) {
//               stressData[date] += item.stress;
//             } else {
//               stressData[date] = item.stress;
//             }
//           }

//           if (item.sports) {
//             item.sports.forEach((sport) => {
//               if (sport.durationInMinutes) {
//                 if (sportsDurationData[date]) {
//                   sportsDurationData[date] += parseInt(sport.durationInMinutes);
//                 } else {
//                   sportsDurationData[date] = parseInt(sport.durationInMinutes);
//                 }
//               }
//             });
//           }
//         });

//         // Convert the aggregated data to JSON format
//         const waterDataJson = Object.keys(waterData).map((date) => ({
//           date,
//           water: waterData[date],
//         }));

//         const stressDataJson = Object.keys(stressData).map((date) => ({
//           date,
//           stress: stressData[date],
//         }));

//         const sportsDurationDataJson = Object.keys(sportsDurationData).map(
//           (date) => ({
//             date,
//             sportsDuration: sportsDurationData[date],
//           })
//         );

//         // Set the JSON data in state
//         setWaterDataJson(waterDataJson);
//         setStressDataJson(stressDataJson);
//         setSportsDurationDataJson(sportsDurationDataJson);

//         setIsLoaded(true);
//       })
//       .catch((error) => {
//         setIsLoaded(true);
//         setError(error);
//       });
//   };

//   useEffect(() => {
//     getActivity();
//   }, []);

//   return (
//     <div>
//       {isLoaded ? (
//         <>
//           {/* Render your charts or display data as needed */}
//           <div>
//             <h2>Water Data (JSON Format)</h2>
//             <pre>{JSON.stringify(waterDataJson, null, 2)}</pre>
//           </div>
//           <div>
//             <h2>Stress Level Data (JSON Format)</h2>
//             <pre>{JSON.stringify(stressDataJson, null, 2)}</pre>
//           </div>
//           <div>
//             <h2>Sports Duration Data (JSON Format)</h2>
//             <pre>{JSON.stringify(sportsDurationDataJson, null, 2)}</pre>
//           </div>
//         </>
//       ) : (
//         <p>Loading...</p>
//       )}
//       {error && <p>Error: {error.message}</p>}
//     </div>
//   );
// }

// import React from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   CartesianGrid,
//   ResponsiveContainer,
// } from "recharts";

// import "./../App.css";

// const data = [
//   { name: "Jan", uv: 400, pv: 2400, amt: 2400 },
//   { name: "Feb", uv: 300, pv: 1398, amt: 2210 },
//   { name: "Mar", uv: 200, pv: 9800, amt: 2290 },
//   { name: "Apr", uv: 278, pv: 3908, amt: 2000 },
//   { name: "May", uv: 189, pv: 4800, amt: 2181 },
// ];

// const CustomTooltip = ({ active, payload, label }) => {
//   if (active && payload && payload.length) {
//     // Customize the tooltip content here
//     const dataPoint = payload[0];
//     const dataKey = payload[0].name;
//     const value = payload[0].value;
//     return (
//       <div className="custom-tooltip">
//         <p>{`Month: ${label}`}</p>
//         {/* <p>{`${dataKey}: ${value}`}</p> */}
//         <p>{`Value: ${dataPoint.name}`}</p>
//       </div>
//     );
//   }

//   return null;
// };

// export default function Chart() {
//   return (
//     <ResponsiveContainer width="100%" height={400}>
//       <LineChart data={data}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="name" />
//         <YAxis />
//         <Tooltip content={<CustomTooltip />} /> {/* Use your custom tooltip */}
//         <Legend />
//         <Line type="monotone" dataKey="uv" stroke="#8884d8" />
//         <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
//       </LineChart>
//     </ResponsiveContainer>
//   );
// }
