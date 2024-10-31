import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import serverAPI from "../api/ServerApi";
import GoogleButton from "../components/GoogleButton/GoogleButton";

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleInput(e) {
    setForm((prevForm) => {
      return {
        ...prevForm,
        [e.target.name]: e.target.value,
      };
    });
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
    <section className="mx-auto w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Login Your Account</h1>
      <h4 className="text-gray-600 mb-6">Join our community in here!</h4>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleInput}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleInput}
          />
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Dont Have an Account?{" "}
          <Link to="/register" className="text-blue-500 underline">
            Register Now
          </Link>
        </p>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600"
        >
          Login
        </button>
        <GoogleButton/>
      </form>
    </section>
  );
}
