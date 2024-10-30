import { Login } from "./pages/LoginPage";
import { RouterProvider, createBrowserRouter, redirect } from "react-router-dom";
import { Register } from "./pages/RegisterPage";
import { Home } from "./pages/Home";
import { Layout } from "./layouts/layouts";
import { Profile } from "./pages/Profile";

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      element: <Layout />,
      loader: () => {
        const token = localStorage.getItem("access_token");
        if (!token) {
          throw redirect("/login");
        } else {
          return null;
        }
      },
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
