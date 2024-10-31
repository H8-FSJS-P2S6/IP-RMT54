import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import serverAPI from "../api/ServerApi";
import "./RegisterPage.css";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  function handleInput(e) {
    setForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleRegister(e) {
    e.preventDefault();
    try {
      await serverAPI.post("/register", form);
      console.log('Registration successful');
      navigate("/login");
    } catch (err) {
      console.log("🚀 ~ handleRegister ~ err:", err);
      Swal.fire(err.response.data.message);
    }
  }

  return (
    <div className="flex">
      <div className="sidenav">
        <div className="register-main-text">
          <h2>Join Our Anime Community<br /> Register Page</h2>
          <p>Fill the form to create an account.</p>
        </div>
      </div>
      <div className="main flex justify-center items-center h-screen">
        <div className="col-md-6 col-sm-12">
          <div className="register-form">
            <form onSubmit={handleRegister}>
              <div className="form-group">
                <label htmlFor="username">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Full Name"
                  name="username"
                  value={form.username}
                  onChange={handleInput}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
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
                Already Have an Account?{" "}
                <Link to="/login" className="text-blue-500 underline">
                  Login Now
                </Link>
              </p>
              <button type="submit" className="btn btn-black">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
