// redux/pokemonSlice.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

// Async thunk to fetch Pokémon
export const fetchPokemon = () => {
  return async (dispacth) => {
    try {
      // fetchPokemonName
      const { data } = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=200"
      );
      const results = data.results;

      // fetchDetail
      const pokemonPromises = results.map((e) =>
        axios
          .get(`https://pokeapi.co/api/v2/pokemon/${e.name}`)
          .then((res) => res.data)
      );  
      
      const allPokemonData = await Promise.all(pokemonPromises);
      // console.log(allPokemonData);
      
      dispacth(fetchSuccess(allPokemonData));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.message,
      });
    }finally{
      dispacth(fetchLoading(false))
    }
  };
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {
    fetchSuccess: (state, action) => {
      state.list = action.payload;
    },
    fetchLoading: (state, action) => {
      state.loading = action.payload;
    }
  },
});
export const { fetchSuccess, fetchLoading } = pokemonSlice.actions;

export default pokemonSlice.reducer;
