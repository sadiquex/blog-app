import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { auth } from "../firebase";

const ProtectedRoutes = () => {
  const [user] = useAuthState(auth);

  const location = useLocation();

  // user authentication
  if (!user) {
    // return to / if the user isn't logged in
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet />; // return the element in the protected route
};

export default ProtectedRoutes;
