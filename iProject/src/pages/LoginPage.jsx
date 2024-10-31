import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import serverAPI from "../api/ServerApi";
import GoogleButton from "../components/GoogleButton/GoogleButton";
import "./LoginPage.css"

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleInput(e) {
    setForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const { data } = await serverAPI.post("/login", form);
      localStorage.setItem("access_token", data.access_token);
      console.log("login success");
      navigate("/");
    } catch (err) {
      console.log("🚀 ~ handleLogin ~ err:", err);
      Swal.fire(err.response.data.message);
    }
  }

  return (
    <div className="flex">
      <div className="sidenav">
        <div className="login-main-text">
          <h2>Nonton Anime Terus?<br /> Login Page</h2>
          <p>Login to access.</p>
        </div>
      </div>
      <div className="main flex justify-center items-center h-screen ">
        <div className="col-md-6 col-sm-12">
          <div className="login-form">
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="email">User Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="User Name"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleInput}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  id="password"
                  name="password"
                  value={form.password}
                  onChange={handleInput}
                />
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Dont have an Account?{" "}
                <Link to="/register" className="text-blue-500 underline">
                  Create now
                </Link>
              </p>
              <button type="submit" className="btn btn-black">
                Login
              </button>
              <Link to="/register" className="btn btn-secondary">
                Register
              </Link>
            </form>
            <div className="mt-4">

            <GoogleButton/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
