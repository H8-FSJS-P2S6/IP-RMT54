import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Swal from "sweetalert2";

const genAI = new GoogleGenerativeAI("AIzaSyA9lnkXWwK_bM2-VFjxhTRO_dHEKrwWrCM");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const GeminiAI = () => {
  const [response, setResponse] = useState("");
  const [favoriteGenre, setFavoriteGenre] = useState("");
  const [favoriteTitle, setFavoriteTitle] = useState("");
  const [desiredElements, setDesiredElements] = useState("");

  const handleSend = async () => {
    try {
      const prompt = `Rekomendasikan anime untuk saya! Saya suka ${favoriteGenre}, dan anime yang saya nikmati adalah ${favoriteTitle}. Saya mencari yang ${desiredElements}. Apa rekomendasinya?`;

      const result = await model.generateContent(prompt);
      setResponse(result.response.text());
    } catch (err) {
      console.log("🚀 ~ handleSend ~ err:", err)
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
      id="GeminiAIChat"
    >
      <section className="input-section" style={{ width: "50%" }}>
        <h1 style={{ textAlign: "center" }}>AI Recommendation</h1>{" "}
        {/* Menambahkan H1 di sini */}
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            value={favoriteGenre}
            onChange={(e) => setFavoriteGenre(e.target.value)}
            placeholder="Genre Favorit"
          />
        </div>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            value={favoriteTitle}
            onChange={(e) => setFavoriteTitle(e.target.value)}
            placeholder="Your Favorite Anime Title"
          />
        </div>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            value={desiredElements}
            onChange={(e) => setDesiredElements(e.target.value)}
            placeholder="Type anything"
          />
        </div>
        <button className="btn btn-primary" onClick={handleSend}>
          Generate
        </button>
        <div className="response mt-3 p-3 border rounded bg-light">
          <h5>Response:</h5>
          <p className="m-0">{response}</p>
        </div>
      </section>
    </div>
  );
};

export default GeminiAI;
