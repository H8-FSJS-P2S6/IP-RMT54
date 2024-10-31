/* eslint-disable react/prop-types */
import "./PokemonCard.css";
import pokeball from "../images/image-removebg-preview.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { gemini } from "../helpers/Gemini";
import hoverSound from "../sounds/mixkit-player-jumping-in-a-video-game-2043.wav";
import { errorSound, sounds } from "../helpers/sound";
import funFactSound from "../sounds/mixkit-winning-a-coin-video-game-2069.wav"
import pokeballCatchSfx from "../sounds/pokemon-caught!-(pokemon-go-jingle)-made-with-Voicemod.mp3"


export function PokemonCard({ id, name, img, type, weight, height }) {
  const [isShown, setIsShown] = useState(false);

  const sound = sounds(hoverSound)
  const ffSound = sounds(funFactSound)
  const pokeballCatchSound = sounds(pokeballCatchSfx);

  const navigate = useNavigate();

  const handleFavorite = async () => {
    try {
      // pokeballCatchSound.start();
      await axios.post(
        "http://localhost:3000/favorites",
        {
          pokemonName: name,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
        if (pokeballCatchSound.loaded) {
          pokeballCatchSound.start();
        } else {
          pokeballCatchSound.onload = () => {
            pokeballCatchSound.start();
          };
        }
      navigate("/profile");
    } catch (error) {
      console.log("🚀 ~ handleFavorite ~ error:", error)
      errorSound.start();
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "You already have this Pokemon on favorited",
      });
    }
  };

  const FunFact = async (pokemon) => {
    const response = await gemini(pokemon);
    ffSound.start()
    Swal.fire({
      icon: "info",
      title: `Fun Fact about ${pokemon}`,
      text: response,
    });
  };


   const onMouse = async () => {
     setIsShown(true);
     sound.start();
   };

   const onMouseLeave = () => {
     setIsShown(false);
     sound.stop();
   };

   useEffect(() => {
     pokeballCatchSound.load();
   }, []);

  return (
    <div className="container">
      {isShown && (
        <div className="shows">
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
        onMouseEnter={onMouse}
        onMouseLeave={onMouseLeave}
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
          onClick={(e) => {
            e.stopPropagation(); 
            handleFavorite();
          }}
        />
      </div>
    </div>
  );
}
