import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemon } from "../stores/PokemonSlice";
import { PokemonCard } from "../components/PokemonCard";
import sortSfx from "../sounds/mixkit-unlock-new-item-game-notification-254.wav";
import { sounds } from "../helpers/sound";
import "./Home.css";

export function Home() {
  const [displayed, setDisplayedPokemon] = useState([]);
  const dispatch = useDispatch();
  const pokemonList = useSelector((state) => state.pokemon.list);
  const loading = useSelector((state) => state.pokemon.loading);

  const sortSound = sounds(sortSfx);

  useEffect(() => {
    if (!pokemonList.length) {
      dispatch(fetchPokemon());
    } else {
      setDisplayedPokemon(pokemonList);
    }
  }, [dispatch, pokemonList]);

  // Filter Pokémon by selected type
  const handleTypeFilter = (type) => {
    sortSound.start();
    const filtered =
      type === "All"
        ? pokemonList
        : pokemonList.filter((p) =>
            p.types.some((t) => t.type.name === type.toLowerCase())
          );
    setDisplayedPokemon(filtered);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="app-container">
      <div className="pokemon-container">
        {/* Buttons for filtering Pokémon types */}
        <div className="d-flex gap-1 mt-2">
          <button
            value="All"
            onClick={(e) => handleTypeFilter(e.target.value)}
            className="btn btn-light bg-warning-subtle"
          >
            All
          </button>
          <button
            value="Fire"
            onClick={(e) => handleTypeFilter(e.target.value)}
            className="btn btn-danger "
          >
            Fire
          </button>
          <button
            value="Grass"
            onClick={(e) => handleTypeFilter(e.target.value)}
            className="btn btn-success"
          >
            Grass
          </button>
          <button
            value="Water"
            onClick={(e) => handleTypeFilter(e.target.value)}
            className="btn btn-info"
          >
            Water
          </button>
          <button
            value="Dark"
            onClick={(e) => handleTypeFilter(e.target.value)}
            className="btn btn-dark"
          >
            Dark
          </button>
          <button
            value="Bug"
            onClick={(e) => handleTypeFilter(e.target.value)}
            className="btn bg-success-subtle"
          >
            Bug
          </button>
          <button
            value="Ground"
            onClick={(e) => handleTypeFilter(e.target.value)}
            className="btn"
            style={{ backgroundColor: "#987554" }}
          >
            Ground
          </button>
          <button
            value="Psychic"
            onClick={(e) => handleTypeFilter(e.target.value)}
            className="btn"
            style={{ backgroundColor: "#D4BEE4" }}
          >
            Psychic
          </button>
          <button
            value="Poison"
            onClick={(e) => handleTypeFilter(e.target.value)}
            className="btn"
            style={{ backgroundColor: "#9B7EBD" }}
          >
            Poison
          </button>
        </div>
        <div className="all-container">
          {displayed.map((e) => (
            <PokemonCard
              key={e.id}
              id={e.id.toString().padStart(3, "0")}
              img={e.sprites.other["official-artwork"].front_default}
              name={e.name.replace(/^./, (str) => str.toUpperCase())}
              type={e.types[0].type.name}
              weight={e.weight}
              height={e.height}
              stats={e.stats.map((stat) => stat.base_stat).slice(0, 3)}
              statsName={e.stats.map((stat) => stat.stat.name).slice(0, 3)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
