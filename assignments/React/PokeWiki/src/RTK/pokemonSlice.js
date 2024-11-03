import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { transformData } from "../API/transformData";

// 포켓몬 리스트 로드하기
export const loadPokemonList = createAsyncThunk(
  "pokemon/loadList",
  async () => {
    const ids = Array.from({ length: 151 }, (_, i) => i + 1);
    const pokemonList = await Promise.all(ids.map(transformData));

    return pokemonList;
  }
);

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: [],
  reducers: {
    toggleLike: (state, action) => {
      return state.map((pokemon) =>
        pokemon.id === action.payload
          ? { ...pokemon, isLiked: !pokemon.isLiked }
          : pokemon
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadPokemonList.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { toggleLike } = pokemonSlice.actions;
export default pokemonSlice.reducer;
