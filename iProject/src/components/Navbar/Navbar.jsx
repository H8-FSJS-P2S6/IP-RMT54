import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
      if (location.hash) {
          const element = document.getElementById(location.hash.replace('#', ''));
          if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
          }
      }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Nonton Anime Terus?
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#GeminiAIChat">
                AI Recomendation
              </Link>
            </li>   
            {/* <li className="nav-item">
              <Link className="nav-link" to="/watchlist/9" >
                Watchlist
              </Link>
            </li>    */}
          </ul>
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
