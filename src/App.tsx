import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./utils/protected/protectedRoutes";
import MainLayout from "./components/ui/layout/MainLayout";
import ErrorPage from "./pages/error/ErrorPage";
import HomePage from "./pages/home/HomePage";
import { postRoutes } from "./routes/post/postRoutes";
import LoginPage from "./pages/auth/LoginPage";
import NotFound404 from "./pages/error/NotFound404";
import SignupPage from "./pages/auth/SignupPage";


// routes
const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      postRoutes
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/sign-up",
    element: <SignupPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "*",
    element: <NotFound404 />,
  },
]);



const App = () => {
  return <RouterProvider router={routes} />;
}

export default App