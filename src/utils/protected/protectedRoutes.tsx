import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/store";
import { getAuth } from "../../redux/features/auth/authSlice";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { authenticated, noAuth, authUser } = useAppSelector((state) => state.auth);
  if (!noAuth && authenticated && authUser) {
    return children;
  }

  if ((!noAuth && !authenticated)) {
    return <Navigate to={"/login"} />;
  }
  else {
    const auth = JSON.parse(getAuth());
    if (!auth?.authUser) {
      return <Navigate to={"/login"} />;
    }
  }
};
