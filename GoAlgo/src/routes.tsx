import { createBrowserRouter } from "react-router-dom";

import ProtectedRoute from "./router/ProtectedRoute";

import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Profile from "./pages/Profile";
import Main from "./pages/Main";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "login",
        element: <SignIn />,
      },
      {
        path: "register",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);
