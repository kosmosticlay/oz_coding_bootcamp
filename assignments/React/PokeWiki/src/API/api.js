const LIST_URL = "https://pokeapi.co/api/v2/pokemon";

// 포켓몬 데이터 가져오기 (이름, 정보URL)
export async function fetchPokemonList(url = LIST_URL) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log(data.results);
    return data;
  } catch (error) {
    console.error("에러 : ", error);
  }
}
