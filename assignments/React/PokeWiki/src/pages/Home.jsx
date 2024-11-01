import { Link, useLoaderData } from "react-router-dom";
import styled from "styled-components";

const PokemonList = styled.ul`
  display: flex;
  flex-direction: column;
`;

/* 
{ count: 1302, 
  next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20', 
  previous: null, 
  results: Array(20)}
*/

export default function Home() {
  const data = useLoaderData();
  const pokemonList = data.results;

  return (
    <>
      <h1>Home 컴포넌트</h1>
      <PokemonList>
        {pokemonList.map((pokemon) => (
          <li key={pokemon.name}>
            <Link to={`/detail/${pokemon.name}`}>{pokemon.krName}</Link>
          </li>
        ))}
      </PokemonList>
    </>
  );
}
