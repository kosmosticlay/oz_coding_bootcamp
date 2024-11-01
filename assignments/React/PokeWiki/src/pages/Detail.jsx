import { useLoaderData } from "react-router-dom";
import { usePokemonData } from "../hooks/usePokemonData";

export default function Detail() {
  const data = useLoaderData(); // 포켓몬 상세 정보(가공 전)
  const pokemon = usePokemonData(data.data, data.krData); // 포켓몬 상세 정보 객체(가공 후)
  console.log(pokemon);

  const {
    id,
    name,
    properties,
    abilities,
    baseExp,
    height,
    weight,
    imageUrl,
    stats,
    krName,
  } = pokemon;

  return (
    <>
      <h1>Detail 컴포넌트</h1>
      <main>
        <h2>{krName}</h2>
        <div>
          <h3>속성:</h3>
          {properties.map((property, index) => (
            <p key={index}>{property}</p>
          ))}
        </div>
      </main>
    </>
  );
}
