import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faClock,
  faDumbbell,
  faGlassWaterDroplet,
  faNoteSticky,
  faPen,
} from "@fortawesome/free-solid-svg-icons";

import { faBed } from "@fortawesome/free-solid-svg-icons";
import { faFaceTired } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";

const API_URL = import.meta.env.VITE_SERVER_URL;

function AddActivity(props) {
  const [date, setDate] = useState("");
  const [stress, setStress] = useState("");
  const [water, setWater] = useState("");
  const [sleep, setSleep] = useState("");
  const [note, setNote] = useState("");
  const [sportType, setSportType] = useState("");
  const [sportLevel, setSportLevel] = useState("");
  const [sportDuration, setSportDuration] = useState("");
  const [sportDescription, setSportDescription] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      // userId:props.userId,
      date,
      sleep,
      water,
      stress,
      sports: [
        {
          type: sportType,
          level: sportLevel,
          durationInMinutes: sportDuration,
          description: sportDescription,
        },
      ],

      note,
    };

    console.log("Frontend Request Body:", requestBody);

    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .post(`${API_URL}/api/checkin`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        // Reset the state to clear the inputs
        setDate("");
        setSleep("");
        setWater("");
        setStress("");
        setNote("");
        setSportType("");
        setSportLevel("");
        setSportDuration("");
        setSportDescription("");

        props.refreshProject();
      })
      .then((response) => {
        navigate(`/checkin`);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="AddTask-container">
      <Form.Group className="pt-4 pb-4">
        <h3>Add Your Daily MOVE</h3>
      </Form.Group>
      <Form>
        {/* <form onSubmit={handleSubmit}> */}
          <Form.Group className="mb-3" controlId="formgroupDate">
            <Form.Label>
              <FontAwesomeIcon icon={faCalendarDays} /> Date
            </Form.Label>
            <Form.Group className="mb-4">
              <input
                type="date"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formgroupStress">
            <Form.Label>
              <FontAwesomeIcon icon={faFaceTired} /> Stress Level
            </Form.Label>
            <Form.Group className="mb-4">
              <select
                name="stress"
                value={stress}
                onChange={(e) => setStress(e.target.value)}
              >
                <option value=""> Select </option>
                <option value="0">Burned-out🤯</option>
                <option value="4">Middle</option>
                <option value="8">Low</option>
                <option value="10">No Stress!🥰</option>
              </select>
            </Form.Group>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formgroupSleep">
            <Form.Label>
              <FontAwesomeIcon icon={faBed} /> Sleep Level
            </Form.Label>
            <Form.Group className="mb-4">
              <select
                name="sleep"
                value={sleep}
                onChange={(e) => setSleep(e.target.value)}
              >
                <option value=""> Select </option>
                <option value="8">+8 hours</option>
                <option value="7">+7 hours</option>
                <option value="6">+6 hours</option>
                <option value="4.5">+4~5 hours</option>
                <option value="3">I need Sleep! 😪</option>
              </select>
            </Form.Group>
          </Form.Group>

          <Form.Group className="mb-4" controlId="formgroupSleep">
            <Form.Label>
              <FontAwesomeIcon icon={faGlassWaterDroplet} /> Hydration Level
              (liters) 💦
            </Form.Label>
            <Form.Group className="mb-4">
              <select
                name="water"
                value={water}
                onChange={(e) => setWater(e.target.value)}
              >
                <option value=""> Select </option>
                <option value="3">+3l 💧💧💧</option>
                <option value="2">+2l 💧💧</option>
                <option value="1">+1l 💧</option>
                <option value="0.5">+0.5l 💦</option>
              </select>
            </Form.Group>
          </Form.Group>

          <Form.Group>
            <Form.Label>
              <FontAwesomeIcon icon={faNoteSticky} /> Note
            </Form.Label>

            <Form.Group className="mb-4 ml-4 mx-auto">
              {/* <textarea
                type="text"
                name="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              /> */}
              <Row className="justify-content-center">
                <Col xs={12} sm={7} className="d-flex">
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </Col>
                <Form.Text id="noteBlock" className="mt-2" muted>
                  Write about your day, goal, and feelings. 🙂
                </Form.Text>
              </Row>
            </Form.Group>
          </Form.Group>

          <Form.Group>
            <Form.Label>
              <FontAwesomeIcon icon={faDumbbell} /> Movement Type
            </Form.Label>
            <Form.Group className="mb-4">
              <select
                name="sportType"
                value={sportType}
                onChange={(e) => setSportType(e.target.value)}
              >
                <option value=""> Select</option>
                <option value="Yoga/Pilates">Yoga/Pilates</option>
                <option value="Crossfit">Crossfit</option>
                <option value="Walk">Walk</option>
                <option value="Water Sports">Water Sports</option>
                <option value="Winter Sports">Winter Sports</option>
                <option value="Stretching">Stretching</option>
                <option value="Run">Run</option>
                <option value="Cycling">Cycling</option>
                <option value="Hiking">Hiking</option>
                <option value="Bouldering">Bouldering</option>
                <option value="Boxing">Boxing</option>
                <option value="Body Weight Training">
                  Body Weight Training
                </option>
                <option value="Others">Others</option>
              </select>
            </Form.Group>
          </Form.Group>

          <Form.Group>
            <Form.Label>
              {" "}
              <FontAwesomeIcon icon={faBolt} /> Level
            </Form.Label>

            <Form.Group className="mb-4">
              <select
                name="sportLevel"
                value={sportLevel}
                onChange={(e) => setSportLevel(e.target.value)}
              >
                <option value=""> Select </option>
                <option value="High-Intensity 🥵">High-Intensity 🥵</option>
                <option value="Mid-Intensity 😊">Mid-Intensity 😊</option>
                <option value="Mild 😌">Mild 😌</option>
              </select>
            </Form.Group>
          </Form.Group>

          <Form.Group>
            <Form.Label>
              {" "}
              <FontAwesomeIcon icon={faClock} /> Duration
            </Form.Label>
            <Form.Group className="mb-4">
              <select
                name="sportDuration"
                value={sportDuration}
                onChange={(e) => setSportDuration(e.target.value)}
              >
                <option value=""> Select </option>
                <option value="3">+3 hours</option>
                <option value="2">+2 hours</option>
                <option value="1">+1 hours</option>
                <option value="0.5">+30 minutes</option>
                <option value="0.25">+20 minutes</option>
                <option value="0.1">10 minutes!😎</option>
              </select>
            </Form.Group>
          </Form.Group>

          <Form.Group>
            <Form.Label>
           
              <FontAwesomeIcon icon={faPen} /> Movement Log
            </Form.Label>
            <Form.Group className="mb-4 ml-4 mx-auto">
              {/* <textarea
                type="text"
                name="sportDescription"
                value={sportDescription}
                onChange={(e) => setSportDescription(e.target.value)}
              /> */}
 <Row className="justify-content-center">
                <Col xs={12} sm={7} className="d-flex">
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="sportDescription"
                    value={sportDescription}
                    placeholder=""
                    onChange={(e) => setSportDescription(e.target.value)}
                  />
                </Col>
                <Form.Text id="noteBlock" className="mt-2" muted>
                  Did you enjoy your movement? 🏃🏻‍♀️🏃🏽‍♂️🏃
                </Form.Text>
              </Row>

            </Form.Group>
          </Form.Group>

          <Form.Group>
        {/* Apply Bootstrap classes to style the button */}
        <button
          type="submit"
          onClick={handleSubmit}
          className="btn btn-warning"  // Bootstrap button classes for primary style
        >
          Add Movement
        </button>
      </Form.Group>
        
      </Form>
    </div>
  );
}

export default AddActivity;
