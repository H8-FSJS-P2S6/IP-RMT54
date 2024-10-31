import { createBrowserRouter, Outlet, redirect } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar/Navbar";
import DetailsPage from "./pages/DetailsPage";

export const router = createBrowserRouter([
  {
    loader: () => {
      if (localStorage.getItem("access_token")) {
        throw redirect("/");
      }
      return null;
    },
    children: [
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
  {
    element: (
        <>
        <Navbar/>
        <Outlet/>
        </>
    ),
    loader: () => {
      if (!localStorage.getItem('access_token')) {
        throw redirect('/login');
      }
      return null;
    },
    children: [
      {
        path: '/',
        element: <HomePage/>
      },
      {
        path: '/anime/:mal_id',
        element: <DetailsPage/>
      }
    ]
  }
]);
