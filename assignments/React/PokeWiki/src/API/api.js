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

// 포켓몬 수치 데이터 가져오기
export async function getPokemonData(name) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error("에러 : ", error);
  }
}

// 포켓몬 한글 데이터 가져오기
export async function getPokemonKRData(name) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${name}`
    );
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error("에러 : ", error);
  }
}
