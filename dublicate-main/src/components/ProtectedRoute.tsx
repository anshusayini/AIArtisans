import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
  role: "buyer" | "seller";
}

const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  const buyerId = localStorage.getItem("buyerId");
  const sellerId = localStorage.getItem("sellerId");

  if (role === "buyer" && !buyerId) {
    return <Navigate to="/buyer/login" replace />;
  }

  if (role === "seller" && !sellerId) {
    return <Navigate to="/seller/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
