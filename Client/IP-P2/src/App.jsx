import { Login } from "./pages/LoginPage";
import { RouterProvider, createBrowserRouter, redirect } from "react-router-dom";
import { Register } from "./pages/RegisterPage";
import { Home } from "./pages/Home";
import { Layout } from "./layouts/layouts";
import { Profile } from "./pages/Profile";

const loginRegister = ()=>{
  const token = localStorage.getItem('access_token')
  if (token) {
    return redirect ("/")
  }else{
    return null
  }
}

function App() {

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
      loader:loginRegister
    },
    {
      path: "/register",
      element: <Register />,
      loader:loginRegister
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
