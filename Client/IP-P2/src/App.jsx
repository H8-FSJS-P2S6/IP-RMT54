import { Login } from "./pages/LoginPage"
import {RouterProvider,createBrowserRouter}from "react-router-dom"
import { Register } from "./pages/RegisterPage";

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
  ]);
  return <RouterProvider router={router}/>
}

export default App
