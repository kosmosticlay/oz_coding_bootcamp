import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadPokemonList } from "../RTK/pokemonSlice";
import { useEffect } from "react";

export default function Detail() {
  const { name } = useParams();
  const dispatch = useDispatch();
  const pokemonList = useSelector((state) => state.pokemon);

  const pokemon = pokemonList.find((p) => p.name === name);

  // Redux 상태가 없을 때 데이터 로드
  useEffect(() => {
    if (!pokemonList || pokemonList.length === 0) {
      dispatch(loadPokemonList());
    }
  }, [dispatch, pokemonList]);

  if (!pokemon) {
    if (!pokemonList || pokemonList.length === 0) {
      return <p>로딩 중...</p>;
    }
    return <p>포켓몬 정보를 찾을 수 없습니다.</p>;
  }

  const {
    id,
    pokemonName,
    properties,
    abilities,
    height,
    weight,
    imageUrl: { mainImg, frontGif, backGif },
    baseExp,
    stats,
    krName,
    krFlavorText,
    captureRate,
    color,
  } = pokemon;

  return (
    <div>
      <h1>{krName}</h1>
      <img src={mainImg} alt={pokemonName} />
      <div>
        <h3>애니메이션:</h3>
      </div>
      <p>속성: {properties.join(", ")}</p>
      <p>능력: {abilities.join(", ")}</p>
      <p>
        키: {height}m, 무게: {weight}kg
      </p>
      <p>경험치: {baseExp}</p>
      <p>포획율: {captureRate}</p>
      <p>색상: {color}</p>
      <p>한글 설명: {krFlavorText.join(" ")}</p>
    </div>
  );
}
