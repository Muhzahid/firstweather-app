import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector(state => state.auth);
  // Optional: token check bhi kar sakte hain
  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
