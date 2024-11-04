import { useDispatch } from "react-redux";
import { lazy, useEffect, useState } from "react";
import { loadPokemonList } from "../../RTK/pokemonSlice";
import { Link } from "react-router-dom";
import InfoMessage from "./InfoMessage";

const CardItem = lazy(() => import("./CardItem"));

export default function CardList({ pokemonList }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // pokemonList가 비어 있을 때 로드
    if (pokemonList.length === 0) {
      setIsLoading(true);
      dispatch(loadPokemonList()).finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [dispatch, pokemonList]);

  return (
    <>
      {pokemonList.length === 0 && <InfoMessage />}
      <ul className="w-full flex flex-wrap gap-14 justify-center">
        {pokemonList.map((pokemon) => (
          <li key={pokemon.name}>
            <Link to={`/detail/${pokemon.name}`}>
              <CardItem pokemon={pokemon} />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
