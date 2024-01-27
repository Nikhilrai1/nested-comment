import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const Toast = () => {
  return (
    <ToastContainer
      bodyClassName="custom-text"
      position="top-center"
      theme="dark"
      rtl={false}
      autoClose={3000}
      pauseOnHover
    />
  );
};
