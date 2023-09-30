import React, { useState } from "react";
import styled from "@emotion/styled";

import Button, { ActionButton } from "./FormButton";
import Rating from "./Options";

const formTypes = {
  dropdown: "dropdown",
  rating: "rating",
  radio: "radio",
  text: "text"
};

const QuestionContainer = styled.div`
  display: ${({ show }) => (show ? "block" : "none")};
  font-size: 12px;
  font-weight: bold;
`;

const ButtonContainer = styled.div`
  position: absolute;
  display: flex;
  left: 50%;
  bottom: 50px;
  transform: translate(-50%);
`;

const Dropdown = styled.select`
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 10px 0;
`;

const Textarea = styled.textarea`
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 10px 5px;
  font-family: sans-serif;
`;

const Radio = styled.div`
  margin: 10px;

  input {
    cursor: pointer;
  }

  label {
    margin: 5px;
  }
`;

const Form = ({
  field, // [String] field for the response
  index, // [Number] index id of the form
  onSubmit, // [Function] called on next or submit
  onPreviousClick, // [Function] called on previous button click
  options, // [Array] only for types: dropdown and radio
  show, // [Boolean] show or hide
  submitButtonText, // [String] text to show on submit button
  type, // [String] types: "rating", "dropdown", "radio", "text"
  question, // [String] the question to answer
  required // [Boolean] if the question is required
}) => {
  const [input, setInput] = useState();

  const handleOnChange = (e) => setInput(e.target.value);

  return (
    <QuestionContainer show={show}>
      {question}
      {required && <span>*</span>}
      {type === formTypes.rating && <Rating onSelect={handleOnChange} />}
      {type === formTypes.dropdown && (
        <Dropdown onChange={handleOnChange}>
          <option disabled>Select one</option>
          {options.map((option) => (
            <option key={option.replace(" ", "")}>{option}</option>
          ))}
        </Dropdown>
      )}
      {type === formTypes.radio &&
       options && options.length > 0 &&
        options.map((option) => (
          <Radio key={option.replace(" ", "")}>
            <input
              id={option}
              name="ease"
              onClick={handleOnChange}
              type="radio"
              value={option}
            />
            <label>{option}</label>
          </Radio>
        ))}
      {type === formTypes.text && (
        <Textarea onChange={handleOnChange} placeholder="Your answer" />
      )}
      <ButtonContainer>
        {index > 0 && <Button onClick={onPreviousClick}>Previous</Button>}
        <ActionButton
          disabled={required && typeof input === "undefined"}
          onClick={onSubmit({ [field]: input })}
        >
          {submitButtonText}
        </ActionButton>
      </ButtonContainer>
    </QuestionContainer>
  );
};

export default Form;
export { formTypes };
