import axios from "axios";
import { useNavigate } from "react-router-dom";
import loginSfx from "../sounds/mixkit-bonus-earned-in-video-game-2058.wav";
import { errorSound, sounds } from "../helpers/sound";
import { useEffect } from "react";
import Swal from "sweetalert2";


export function GoogleLogin() {
    const navigate = useNavigate()
    const loginSound = sounds(loginSfx);

    async function handleCredentialResponse(response) {
        try {
            
            console.log("Encoded JWT ID token: " + response.credential);
            const { data } = await axios.post(
              "http://localhost:3000/googleLogin",
              null,
              {
                headers: {
                  token: response.credential,
                },
              }
            );
            localStorage.setItem("access_token", data.access_token);
            loginSound.start();
            navigate("/");
        } catch (error) {
            errorSound.start();
            Swal.fire({
              icon: "error",
              title: "Error",
              text: error.response.data.message,
            });
        }
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
        className="d-flex justify-content-center w-100"
        style={{ backgroundColor: "#fff", padding: "0", margin: "0" }}
      >
        
        <button id="buttonDiv" style={{border:0, backgroundColor:"transparent"}}></button>
      </div>
    );
    
}