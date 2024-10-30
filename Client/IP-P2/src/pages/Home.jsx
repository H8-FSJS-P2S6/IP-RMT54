import { useState, useEffect } from "react";
import axios from "axios";
import { PokemonCard } from "../components/PokemonCard";
import "./Home.css";

export function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [displayedPokemon, setDisplayedPokemon] = useState([]);

  // Fetch Pokémon list from API
  const fetchPokemon = async () => {
    try {
      const { data } = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=200"
      );

      const results = data.results;
      const pokemonPromises = results.map((e) =>
        axios
          .get(`https://pokeapi.co/api/v2/pokemon/${e.name}`)
          .then((res) => res.data)
      );

      const allPokemonData = await Promise.all(pokemonPromises);

      // Sort Pokémon data by ID and set state
      const sortedPokemonData = allPokemonData.sort((a, b) => a.id - b.id);
      setPokemonList(sortedPokemonData);
      setDisplayedPokemon(sortedPokemonData); // Initial display list
    } catch (error) {
      console.log(error);
    }
  };

  // Filter Pokémon by selected type
  const handleTypeFilter = (type) => {
    if (type === "All") {
      setDisplayedPokemon(pokemonList); // Show all Pokémon
    } else {
      const filtered = pokemonList.filter((p) =>
        p.types.some((t) => t.type.name === type.toLowerCase())
      );
      setDisplayedPokemon(filtered); // Show filtered list
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  return (
    <>
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
            {displayedPokemon.map((e) => (
              <PokemonCard
                key={e.id}
                readId={e.id}
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
    </>
  );
}
