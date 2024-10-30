/* eslint-disable react/prop-types */
import "./PokemonCard.css";
import pokeball from "../images/image-removebg-preview.png";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { gemini } from "../helpers/Gemini";

export function PokemonCard({ id, name, img, type, weight, height, realId }) {
  const [isShown, setIsShown] = useState(false);

  const navigate = useNavigate();

  const handleFavorite = async () => {
    try {
      await axios.post(
        "http://localhost:3000/login",
        {
          PokemonId: realId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  const FunFact = async (pokemon) => {
    // const response = await gemini(pokemon);

    // Swal.fire({
    //   icon: "info",
    //   title: `Fun Fact about ${pokemon}`,
    //   text: response,
    // });
  };
  return (
    <div className="container">
      {isShown && (
        <div className="show">
          <img src={img} alt={name} style={{ width: "300px" }} />
          <table className="table rounded-3">
            <thead className="table-warning">
              <tr>
                <th scope="col">Type</th>
                <th scope="col">Height</th>
                <th scope="col">Weight</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{type.replace(/^./, (str) => str.toUpperCase())}</td>
                <td>{height * 10} cm</td>
                <td>{weight} lbs</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      <div
        className="right"
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
        onClick={() => {
          FunFact(name);
        }}
      >
        <img
          src={img}
          alt={name}
          style={{ maxHeight: "50px", marginRight: "10px", width: "50px" }}
        />
        <p style={{ width: "270px" }}>No. {id}</p>
        <p>{name}</p>
        <img
          src={pokeball}
          alt="pokeball"
          style={{ marginLeft: "auto", width: "40px" }}
          onClick={handleFavorite}
        />
      </div>
    </div>
  );
}
