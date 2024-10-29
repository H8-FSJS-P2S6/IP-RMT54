import React from "react";
import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

export function Login() {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #ff8c00, #e8e5e1)",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        className="card p-4 text-center shadow"
        style={{ width: "350px", borderRadius: "10px" }}
      >
        <form>
          <img
            src="https://img.icons8.com/color/96/000000/pokeball.png"
            alt="Pokémon Logo"
            className="mb-3"
            style={{ width: "100px" }}
          />
          <h2 className="font-weight-bold mb-4" style={{ color: "#3B4CCA" }}>
            Pokémon Trainer Login
          </h2>
          <div className="gap-2 d-flex flex-column">
            <div className="form-group">
              <input
                type="text"
                className="form-control rounded-pill"
                placeholder="Email"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control rounded-pill"
                placeholder="Password"
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-block rounded-pill"
              style={{
                backgroundColor: "#FFDE00",
                color: "#3B4CCA",
                border: "none",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#3B4CCA";
                e.target.style.color = "#FFDE00";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#FFDE00";
                e.target.style.color = "#3B4CCA";
              }}
            >
              Login
            </button>
            <p>Don't have an Account? <Link to="">Register</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}
