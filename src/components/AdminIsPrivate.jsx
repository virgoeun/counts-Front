import { useContext,  } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";

function AdminIsPrivate({ children }) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  // If the authentication is still loading ⏳
  if (isLoading) return <p>Loading ...</p>;

  if (!isLoggedIn) {
  // If the user is not logged in ❌
    return <Link to="/admin-login" />;
  } else {
  // If the user is logged in, allow to see the page ✅
  return children;
  }
}

export default AdminIsPrivate;