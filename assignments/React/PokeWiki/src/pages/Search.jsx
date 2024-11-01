import { Link, useLoaderData } from "react-router-dom";

export default function Search() {
  const data = useLoaderData();
  const pokemonList = data.results;
  return (
    <>
      <h1>Search 컴포넌트</h1>
      <form>
        <input type="text" placeholder="포켓몬 이름을 입력하세요." />
        <button>포켓몬 찾기</button>
      </form>
      <ul>
        {pokemonList.map((pokemon) => (
          <li key={pokemon.name}>
            <Link to={`/detail/${pokemon.name}`}>{pokemon.krName}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
