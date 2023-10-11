import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Form } from "react-bootstrap";

const API_URL = import.meta.env.VITE_SERVER_URL;

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    const requestBody = { email, password, userName: name };

    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        navigate("/profile");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="SignupPage">
      <div> 
      <h1 className="mb-5">Sign Up</h1>
      <div className="d-flex justify-content-center mt-5 mb-4">
      <Form  onSubmit={handleSignupSubmit}> 
      <Form.Group className="mb-3">
        <Form.Label className="mb-5">Email:</Form.Label>
        <input type="email" name="email" value={email} onChange={handleEmail} />
        </Form.Group>
        <Form.Group className="mb-3">
        <label className="ml-5">Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />
        </Form.Group>
 <Form.Group className="mb-3"> 
        <label>Name:</label>
        <input type="text" name="name" value={name} onChange={handleName} />
        </Form.Group>
        <Form.Group ><Button variant="outline-info" type="submit">Sign Up</Button> </Form.Group>
        </Form>
        </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Already have account?</p>
      <Link to={"/login"}> Login</Link>
      </div>
    </div>
  );
}

export default SignupPage;
