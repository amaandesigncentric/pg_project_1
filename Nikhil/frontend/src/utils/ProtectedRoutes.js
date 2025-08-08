import React, { useEffect } from "react";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ element, allowedRoutes = [] }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    if (allowedRoutes.length === 0) {
      navigate("/unauthorised-access");
      return;
    }

    if (user.position === "admin") {
      return;
    }

    const userCanAccess = allowedRoutes.includes(user.position);
    if (!userCanAccess) {
      navigate("/unauthorised-access");
    }
  }, [user, allowedRoutes, navigate]);

  if (!user) return navigate("/");
  if (allowedRoutes.length === 0) return navigate("/unauthorised-access");
  if (user.position === "admin") return element;

  const userCanAccess = allowedRoutes.includes(user.position);
  return userCanAccess ? element : navigate("/unauthorised-access");
};

export default ProtectedRoutes;
