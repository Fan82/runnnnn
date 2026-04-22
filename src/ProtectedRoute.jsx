import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("demo_logged_in") === "true";
    if (!isLoggedIn) navigate("/login");
    setLoading(false);
  }, []);

  if (loading) return null;

  return children;
}

export default ProtectedRoute;
