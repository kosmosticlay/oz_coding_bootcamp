import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadPokemonList } from "../RTK/pokemonSlice";
// import Card from "../components/Card";

export default function Home() {
  const dispatch = useDispatch();
  const pokemonList = useSelector((state) => state.pokemon);

  useEffect(() => {
    if (!pokemonList || pokemonList.length === 0) {
      dispatch(loadPokemonList());
    }
  }, [dispatch, pokemonList]);

  return (
    <>
      <h1>Home 컴포넌트</h1>
      <ul>
        {pokemonList?.map((pokemon) => (
          <li key={pokemon.name}>
            <Link to={`/detail/${pokemon.name}`}>{/* <Card></Card> */}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
