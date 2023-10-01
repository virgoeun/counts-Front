import React, { useState } from "react";
import styled from "@emotion/styled";

import { CloseButton } from "./FormButton";
import Form from "./DailyForm";
import { questions } from "../../static/questions"

const FormQuestions = styled.div`
  display: ${({ open }) => (open ? "block" : "none")};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 400px;
  width: 450px;
  border-radius: 3px;
  padding: 30px;
  background: white;
  box-shadow: 5px 5px 5px darkgray;

  i {
    color: darkgray;
    font-size: 12px;
  }
`;

const FormContainer = styled.div`
  margin-top: 50px;
`;

export default function Survey({ onClose, onSubmit, open, title }) {
  const [surveyResponse, setSurveyResponse] = useState({});
  const [pageIndex, setPageIndex] = useState(0);

  const handleFormSubmit = (index) => (response) => () => {
    if (index === questions.length - 1) {
      setPageIndex(0);
      onSubmit({ ...surveyResponse, ...response });
      // onSubmit({ ...surveyResponse, ...response, completed: true });
      setSurveyResponse({});
      onClose();
    } else {
      setSurveyResponse({ ...surveyResponse, ...response });
      setPageIndex(index + 1);
    }
  };

  return (
    <FormQuestions open={open}>
      <h1>{title}</h1>
      <span>*</span>
      <i>Required fields</i>
      <CloseButton onClick={onClose}>x</CloseButton>
      <FormContainer>
        {questions.map(
          (
            { field, options, submitButtonText, type, question, required },
            index
          ) => (
            <Form
              key={`question-${index}`}
              index={index}
              field={field}
              onSubmit={handleFormSubmit(index)}
              onPreviousClick={() => setPageIndex(index - 1)}
              options={options}
              show={pageIndex === index}
              submitButtonText={submitButtonText}
              type={type}
              question={question}
              required={required}
            />
          )
        )}
      </FormContainer>
    </FormQuestions>
  );
}
