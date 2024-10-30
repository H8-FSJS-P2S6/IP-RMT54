import { createBrowserRouter } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

export const router = createBrowserRouter([
    {
        path: "/register",
        index: true,
        element: <RegisterPage/>
    },
    {
        path: "/login",
        index: true,
        element: <LoginPage/>
    }
  ]);