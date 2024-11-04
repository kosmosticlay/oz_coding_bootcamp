import { useSelector } from "react-redux";
import CardList from "../components/commons/CardList";

export default function Favorites() {
  const pokemonList = useSelector((state) => state.pokemon) || [];

  const filteredList = pokemonList.filter(
    (pokemon) => pokemon.isLiked === true
  );

  return (
    <div className="page">
      <CardList pokemonList={filteredList} />
    </div>
  );
}
