import styled from "@emotion/styled";

const Button = styled.button`
  border: none;
  background: none;
  color: darkslategray;
  text-decoration: underline;
  cursor: pointer;
  opacity: 0.8;

  &:hover {
    opacity: 1;
  }
`;

const ActionButton = styled(Button)`
  width: 200px;
  margin: 12px;
  border-radius: 3px;
  padding: 10px;
  background: lightsteelblue;
  text-decoration: none;

  &:disabled {
    opacity: 0.25;
    cursor: not-allowed;
  }
`;

const CloseButton = styled(Button)`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  font-size: 24px;
  text-decoration: none;
`;

const RatingButton = styled(Button)`
  height: 30px;
  width: 30px;
  background: whitesmoke;
  text-decoration: none;
`;

export default Button;
export { ActionButton, CloseButton, RatingButton };
