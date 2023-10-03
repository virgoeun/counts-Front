import React, { useState } from "react";
import styled from "@emotion/styled";
import "../index.css";
import axios from "axios";
import { Link } from "react-router-dom";

import { ActionButton } from "../components/DailyActivity/FormButton";
import Survey from "./DailyActivity/FormQuestions";
import { companyName } from "../static/questions";

// survey state: surveyResponse, pageIndex
// survey props: onClose, onSubmit, open, title

// Actions on each page: exit, back/previous, next/submit
// 5 pages:
//  - rating
//  - dropdown 1
//  - dropdown 2
//  - one radio selection question
//  - textbox feedback

// submit response data structure:
// surveyResponse = {
//   rating: Number,
//   category: String,
//   goal: String,
//   ease: number,
//   feedback: String
//   complete: Boolean
// }

// details:
//    - indication for when user completes survey
//    - form is a popup there for it's NOT responsive

const ActivatorContainer = styled.div``;
const API_URL = "http://localhost:5005";

export default function DailyApp({ data }) {
  const [surveyOpen, setSurveyOpen] = useState(false);
  const [surveyResponse, setSurveyResponse] = useState({});

  // const sendProfileData = (data) => {
  //   axios
  //     .post(`${API_URL}/api/checkin`, data)
  //     .then((response) => {
  //       addFormData();
  //       console.log("Profile data sent successfully:", response.data);
  //     })
  //     .catch((error) => {
  //       // Handle errors here
  //       console.error("Error sending profile data:", error);
  //     });
  // };

  return (
    <div className="App">
      <ActivatorContainer>
        <h3>
          {surveyResponse.completed && `Remember, every moves COUNTS! 😉`}
        </h3>
        <ActionButton onClick={() => setSurveyOpen(!surveyOpen)}>
          Track My Log
        </ActionButton>
      
          <Link to="/profile">
           
             <button>Back to Profile 🔙 </button> 
          </Link>
     
      </ActivatorContainer>
      <Survey
        onClose={() => setSurveyOpen(false)}
        onSubmit={(data) => {
          setSurveyResponse(data);

          if (data.completed) {
            sendProfileData(data);
          }
        }}
        open={surveyOpen}
        title={companyName}
      />
      {surveyResponse.completed && (
        <ul>
          {Object.keys(surveyResponse).map(
            (key) =>
              surveyResponse[key] && (
                <li key={key}>
                  {key}: {surveyResponse[key].toString()}
                </li>
              )
          )}
        </ul>
      )}
      <Link to="/">
        <button>Back to Homepage</button>
      </Link>
    </div>
  );
}
