import { Link, useNavigate } from "react-router-dom";
import pokeball from "../images/image-removebg-preview.png";
import logoutSfx from "../sounds/mixkit-arcade-retro-game-over-213.wav";
import { globalSound, sounds } from "../helpers/sound";

export function Navbar() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("access_token");
    logoutSound.start();
    navigate("/login");
  };
  const logoutSound = sounds(logoutSfx);


  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-0 py-3">
        <div className="container-xl">
          {/* <!-- Logo --> */}
          <Link
            className="navbar-brand"
            to="/"
            onClick={() => globalSound.start()}
          >
            <img src={pokeball} alt="pokeball" style={{ width: "30px" }} />
            Pokédex
          </Link>
          {/* <!-- Navbar toggle --> */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {/* <!-- Collapse --> */}
          <div className="collapse navbar-collapse" id="navbarCollapse">
            {/* <!-- Nav --> */}
            <div className="navbar-nav mx-lg-auto">
              <Link
                className="nav-item nav-link"
                to="/profile"
                onClick={() => globalSound.start()}
              >
                <i className="fa-solid fa-user mx-2"></i>
                Profile
              </Link>
            </div>
            {/* <!-- Action --> */}
            <div className="d-flex align-items-lg-center mt-3 mt-lg-0">
              <a
                onClick={logout}
                className="btn btn-sm btn-danger w-full w-lg-auto"
              >
                Logout
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
