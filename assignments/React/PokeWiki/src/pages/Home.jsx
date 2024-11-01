import { Link, useLoaderData } from "react-router-dom";
import { fetchPokemonList } from "../API/api";
import styled from "styled-components";

const PokemonList = styled.ul`
  display: flex;
  flex-direction: column;
`;

export const homeLoader = () => fetchPokemonList();
/* 
{ count: 1302, 
  next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20', 
  previous: null, 
  results: Array(20)}
*/

export default function Home() {
  const data = useLoaderData();
  const pokemonList = data.results;
  console.log(pokemonList);

  return (
    <>
      <h1>Home 컴포넌트</h1>
      <PokemonList>
        {pokemonList.map((pokemon, index) => (
          <Link key={index}>{pokemon.name}</Link>
        ))}
      </PokemonList>
    </>
  );
}
