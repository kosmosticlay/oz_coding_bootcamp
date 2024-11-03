import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadPokemonList } from "../RTK/pokemonSlice";
import CardItem from "../components/commons/CardItem";

export default function Home() {
  const dispatch = useDispatch();
  const pokemonList = useSelector((state) => state.pokemon) || [];

  useEffect(() => {
    if (!pokemonList || pokemonList.length === 0) {
      dispatch(loadPokemonList());
    }
  }, [dispatch, pokemonList]);

  return (
    <div className="page">
      <ul className="w-full flex flex-wrap gap-14 justify-center">
        {pokemonList?.map((pokemon) => (
          <li key={pokemon.name}>
            <Link to={`/detail/${pokemon.name}`}>
              <CardItem pokemon={pokemon} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
