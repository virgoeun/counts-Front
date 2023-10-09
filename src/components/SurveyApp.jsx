import React, { useState } from "react";
import styled from "@emotion/styled";
import "../index.css";
import { Link } from "react-router-dom";

import { ActionButton } from "./FeedbackForm/FormButton";
import Survey from "./FeedbackForm/FormQuestions";
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

const API_URL = import.meta.env.VITE_SERVER_URL;

export default function SurveyApp({ data }) {
  const [surveyOpen, setSurveyOpen] = useState(false);
  const [surveyResponse, setSurveyResponse] = useState({});

  return (
    <div className="App">
      <ActivatorContainer>
        <h3>{surveyResponse.completed && `Remember, every move COUNTS! 😉`}</h3>
        <ActionButton onClick={() => setSurveyOpen(prevState => !prevState)}>
          <h2>Feedback</h2>
          <p>Your feedback is important for us💖</p>
        </ActionButton>

        {/* <Link to="/profile">
          <button>Back to Profile 🔙</button>
        </Link> */}
      </ActivatorContainer>

      {surveyOpen && ( // Check if surveyOpen is true
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
      )}

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

      <Link to="/profile">
        <button>Back to Profile</button>
      </Link>
    </div>
  );
}
