import { useRef } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import { Form } from "react-bootstrap";
import ScrollToTop from "../../components/ScrollToTop";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonWalking, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import DINO from "../../assets/DINO-1.png";
import smile from "../../assets/main/smile.jpg";
import { Button } from "react-bootstrap";
import DINO3 from "../../assets/DINO-1.png";
import plan from "../../assets/workouts/Workout Schedule.png";
import heart from "../../assets/workouts/Heart Rate.png";
import mat from "../../assets/workouts/Yoga Mat.png";

function Home() {
  const services = useRef(null);
  const blog = useRef(null);
  const contact = useRef(null);

  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: "smooth",
    });
  };

  return (
    <div className="home">
      <ScrollToTop />
      <div className="hero text-center">
        <ul className="nav justify-content-center">
          <li
            onClick={() => scrollToSection(services)}
            className=" nav-item link"
          >
            <div className="text-center mt-5 mb-5">
              <h1 className="display-1">
                Every Move <span className="text-Move">Counts! </span>
              </h1>
            </div>

            <div className="image-container ">
              <img
                src={DINO}
                alt="Image 2/"
                className="img-fluid"
                style={{ maxWidth: "30%", height: "auto" }}
              />
            </div>
          </li>

          <li
            onClick={() => scrollToSection(services)}
            className="nav-item mx-3 link"
          >
            <div className="flex-container mt-5">
              <span
                style={{ fontSize: "20px", fontWeight: "bold" }}
                className="font-weight-bold fs-4"
              >
                <FontAwesomeIcon icon={faPersonWalking} /> Counts
              </span>
            </div>
          </li>

          <li
            onClick={() => scrollToSection(blog)}
            className="nav-item mx-3 link"
          >
            <div className="flex-container mt-5">
              <span
                style={{ fontSize: "20px", fontWeight: "bold" }}
                className="font-weight-bold fs-4"
              >
                Meet Alice 👋{" "}
              </span>
            </div>
          </li>

          <li
            onClick={() => scrollToSection(contact)}
            className="nav-item mx-3 link"
          >
            <div className="flex-container mt-5">
              <span
                style={{ fontSize: "20px", fontWeight: "heavy" }}
                className="font-weight-bold fs-4"
              >
                Contact
              </span>
            </div>
          </li>
        </ul>

        <p className="mt-4">Let's Start the Journey with US! 🥰</p>
        <Link to={"/signup"}> Counts Free Membership Signup</Link>
      </div>

      <div ref={services} className="services">
        <FontAwesomeIcon icon={faPersonWalking} className="fa-4x" />
        <h2 className="mt-5 mb-5">We Are<span className="text-Move"> Counts </span>! </h2>

        <div className="image-container m-5">
          <img
            src={mat}
            alt="Image 2/"
            className="img-fluid"
            style={{ maxWidth: "20%", height: "auto" }}
          />
        </div>

        <div className="text-center mt-5 mb-5 mx-3">
          <div className="stacked-item mb-4">
            <h4 className="mt-5">Welcome All Moves! </h4>
            <p style={{ maxWidth: "800px", margin: "0 auto" }} className="mb-5">
              Counts encourage any forms of movements. We cheer even just 10
              minutes of walking! 🥳{" "}
            </p>
          </div>
          <div className="stacked-item mb-4">
            <img
              src={plan}
              alt="Image 2/"
              className="img-fluid"
              style={{ maxWidth: "20%", height: "auto" }}
            />
            <h4 className="mt-5">No Rules or Restrictions </h4>
            <p style={{ maxWidth: "800px", margin: "0 auto" }} className="mb-5">
              There are no rules regarding healthy life-style. You do YOU! 💖{" "}
            </p>
          </div>
          <div className="stacked-item mb-4">
            <img
              src={heart}
              alt="Image 2/"
              className="img-fluid"
              style={{ maxWidth: "20%", height: "auto" }}
            />
            <h4 className="mt-5">Mental ﹥ Physical</h4>
            <p style={{ maxWidth: "800px", margin: "0 auto" }} className="mb-5">
              Yes, workout matters. However, Counts inspire you to take care of
              your mental health always FIRST. 🧠{" "}
            </p>
          </div>
        </div>
      </div>
      <div ref={blog} className="blog">
        <FontAwesomeIcon icon={faPersonWalking} className="fa-4x" />
        <div className="image-container mt-5">
          <img
            src={smile}
            alt="Image 2/"
            className="img-fluid"
            style={{ maxWidth: "70%", height: "auto" }}
          />
        </div>
        <div className="text-center mt-5 mb-5 mx-3">
          <h3 className="mt-5">Hi, I am Alice! 👋 </h3>
          <p className="mt-5" style={{ maxWidth: "700px", margin: "0 auto" }}>
            I am here to help you feel more inspired to move your body in any
            forms. It's not about diet or having a flat belly or even fit body.
            We are so bombarded with pressures from social meadis these days
            that we have to workout 4-5 days in a gym and have strict diet to
            keep 'tonned' body. However, all those years of working as a
            professional trainer and pilates instructor, I've realized that
            those pressure and so-called strict diet and workout schedules harm
            your body and most of all, mental health. I coached many womean and
            men, and surprisingly many of them had problems of enjoying workouts
            and life in general due to these pressures (aka 'must look tonned').
            That is why I started building this platform to reach out more
            people and help them acheive healthy lifestyle in any forms!{" "}
          </p>
        </div>
      </div>
      <div ref={contact} className="contact">
     
        <div className="d-flex flex-column justify-content-between align-items-center">
        <div className="d-flex align-items-center mb-3"> 
        <Form.Group>  <FontAwesomeIcon icon={faEnvelope} className="fa-3x pb-2 mr-2" /> </Form.Group> 
        <Form.Group><h3 className="pt-2 mb-0 ml-5">Contact</h3> </Form.Group>  
      </div>
          <div className="d-flex flex-column align-items-center">
            <span className="pr-5 pb-2"> Email: countshere@counts.com</span>
            <span className="pr-5 pb-2">
              Address: 10485 Ironstraß 13, Berlin, Germany
            </span>
            <span className="pr-5"> Email: countshere@counts.com</span>
            <span className="mt-2 alice-text">
              Alice Choi's IronHack BootCamp Full-Stack Project @Counts
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
