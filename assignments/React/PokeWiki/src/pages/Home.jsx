import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { loadPokemonList } from "../RTK/pokemonSlice";
import Loader from "../components/commons/Loader";
import CardList from "../components/commons/CardList";

export default function Home() {
  const dispatch = useDispatch();
  const pokemonList = useSelector((state) => state.pokemon) || [];
  const [isLoading, setIsLoading] = useState(true);

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
      {isLoading ? <Loader /> : <CardList pokemonList={pokemonList} />}
    </div>
  );
}
