import { getPokemonData, getPokemonKRData } from "../API/api";

export default async function pokemonLoader({ params }) {
  const pokemonName = params.id;
  const data = await getPokemonData(pokemonName);
  const krData = await getPokemonKRData(pokemonName);
  return { data, krData };
}
