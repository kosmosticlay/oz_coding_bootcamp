import { fetchPokemonList, getPokemonKRData } from "../API/api";

export default async function homeLoader() {
  const listData = await fetchPokemonList();

  const pokemonList = await Promise.all(
    listData.results.map(async (pokemon) => {
      const krData = await getPokemonKRData(pokemon.name);
      const krName = krData.names.find(
        (nameData) => nameData.language.name === "ko"
      )?.name;

      return {
        name: pokemon.name,
        url: pokemon.url,
        krName: krName || "한글이름 없음",
      };
    })
  );

  return { results: pokemonList };
}
