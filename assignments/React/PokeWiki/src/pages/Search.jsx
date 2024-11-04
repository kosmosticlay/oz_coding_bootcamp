import { useSelector } from "react-redux";
import { createContext, useState } from "react";
import SearchBar from "../components/commons/SearchBar";
import CardList from "../components/commons/CardList";

export const SearchContext = createContext();

export default function Search() {
  const [keyword, setKeyword] = useState("");
  const pokemonList = useSelector((state) => state.pokemon) || [];

  const filteredList = pokemonList.filter(
    (pokemon) =>
      pokemon.name.toLowerCase().includes(keyword.toLowerCase()) ||
      (pokemon.krName &&
        pokemon.krName.toLowerCase().includes(keyword.toLowerCase()))
  );

  return (
    <SearchContext.Provider value={{ keyword, setKeyword }}>
      <div className="page flex flex-col gap-5">
        <SearchBar />
        <CardList pokemonList={filteredList} />
      </div>
    </SearchContext.Provider>
  );
}
