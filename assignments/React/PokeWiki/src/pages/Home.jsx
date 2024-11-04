import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { loadPokemonList } from "../RTK/pokemonSlice";
import CardItem from "../components/commons/CardItem";
import Loader from "../components/commons/Loader";

export default function Home() {
  const dispatch = useDispatch();
  const pokemonList = useSelector((state) => state.pokemon) || [];
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    if (pokemonList.length === 0) {
      setIsLoading(true);
      dispatch(loadPokemonList()).then(() => setIsLoading(false)); // 로딩 완료 시 상태 변경
    } else {
      setIsLoading(false);
    }
  }, [dispatch, pokemonList]);

  return (
    <div className="page">
      {isLoading ? (
        <Loader /> // 로딩 중일 때 표시될 컴포넌트
      ) : (
        <ul className="w-full flex flex-wrap gap-14 justify-center">
          {pokemonList.map((pokemon) => (
            <li key={pokemon.name}>
              <Link to={`/detail/${pokemon.name}`}>
                <CardItem pokemon={pokemon} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
