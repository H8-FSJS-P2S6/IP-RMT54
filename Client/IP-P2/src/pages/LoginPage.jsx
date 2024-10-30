import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

// import "bootstrap/dist/css/bootstrap.min.css";

export function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(user);
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:3000/login", user);
      localStorage.setItem("access_token", data.access_token);
      navigate("/");
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.message,
      });
    }
  };
  function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
  }

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id:
        "697357985271-l1afcf7tksdvfcn75hb7qu0rktsie7fg.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });
    window.google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" } // customization attributes
    );
    window.google.accounts.id.prompt(); // also display the One Tap dialog
  }, []);
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
        backgroundImage:
          "url('https://static.vecteezy.com/system/resources/previews/035/992/009/non_2x/cartoon-landscape-with-white-clouds-on-sky-background-with-cloud-and-beautiful-field-summer-green-country-hill-meadow-scene-spring-nature-land-illustration-vector.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="d-flex align-items-center shadow p-4"
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
        }}
      >
        {/* Left Image */}
        <img
          src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/5f297040585033.57851fbd33ae2.jpg"
          alt="Pokémon Logo"
          style={{
            width: "237px",
            borderRadius: "10px",
          }}
        />

        {/* Form Container */}
        <div
          className="card p-4 text-center"
          style={{ width: "350px", borderRadius: "10px", boxShadow: "none" }}
        >
          <form onSubmit={handleSubmit}>
            <h2 className="font-weight-bold mb-4">Pokémon Trainer Login</h2>
            <div className="gap-2 d-flex flex-column">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control rounded-pill"
                  placeholder="Email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control rounded-pill"
                  placeholder="Password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
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
              <div
                className="d-flex justify-content-center w-100"
                style={{ backgroundColor: "#fff", padding: "0", margin: "0" }}
              >
                <button
                  className="btn btn-outline-secondary d-flex align-items-center justify-content-center w-100"
                  id="buttonDiv"
                  style={{
                    borderRadius: "8px",
                    padding: "8px",
                    fontWeight: "bold",
                    backgroundColor: "#fff", // Ensures button background is white
                    boxShadow: "none", // Remove any shadow if present
                    borderColor: "#dbdbd9", // Optional: match border color to the login form
                  }}
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                    alt="Google Logo"
                    style={{
                      width: "20px",
                      height: "20px",
                      marginRight: "8px",
                    }}
                  />
                  <span>Sign in with Google</span>
                </button>
              </div>

              <p className="mt-3">
                Don&apos;t have an Account? <Link to="/register">Register</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
