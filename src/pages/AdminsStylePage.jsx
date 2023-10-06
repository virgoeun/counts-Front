import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddAmindStyle from "../components/AdminStyle/AddAdminStyle";
import { AuthContext } from "../context/auth.context";

const API_URL = "https://counts-back.onrender.com";

function AdminStylePage() {
  const [adminStyles, setAdminStyles] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const getAdminStyles = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/api/admin-style`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setAdminStyles(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAdminStyles();

    if (user && user.email.includes("admin")) {
    } else {
      navigate("/");
    }
  }, [user, navigate]);

  console.log("Admin Style ", adminStyles);

  return (
    <>
      <AddAmindStyle refreshStyles={getAdminStyles} />
    </>
  );
}

export default AdminStylePage;
