import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { transformData } from "../API/transformData";

// 포켓몬 리스트 로드
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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadPokemonList.fulfilled, (state, action) => {
      return action.payload; // fulfilled일 때 상태를 바로 payload로 대체
    });
  },
});

export default pokemonSlice.reducer;
