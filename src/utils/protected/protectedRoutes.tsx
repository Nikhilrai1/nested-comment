import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/store";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { authenticated, noAuth } = useAppSelector((state) => state.auth);
  
  if (!noAuth && authenticated) {
    return children;
  }

  if (!noAuth && !authenticated) {
    return <Navigate to={"/login"} />;
  }

  return <p>Loading...</p>;
};
