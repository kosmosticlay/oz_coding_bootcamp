import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { loadPokemonList, toggleLike } from "../RTK/pokemonSlice";
import { useEffect, useState } from "react";
import { CheckIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import Footer from "../components/Footer";
import ScrollToTop from "../components/commons/ScrollToTop";
import Loader from "../components/commons/Loader";

export default function Detail() {
  let { name } = useParams();
  const dispatch = useDispatch();
  const pokemonList = useSelector((state) => state.pokemon);
  const [isLoading, setIsLoading] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  const pokemon = pokemonList.find((p) => p.name === name);

  // Redux 상태가 없을 때 데이터 로드하기
  useEffect(() => {
    if (!pokemonList || pokemonList.length === 0) {
      dispatch(loadPokemonList());
    }
  }, [dispatch, pokemonList]);

  useEffect(() => {
    if (pokemon) {
      // 새로운 이미지 객체 생성 후 로딩을 체크
      const frontImage = new Image();
      const backImage = new Image();

      frontImage.src = pokemon.imageUrl.frontGif;
      backImage.src = pokemon.imageUrl.backGif;

      // 두 이미지가 모두 로드된 경우 로딩 상태 해제
      frontImage.onload = () => {
        if (backImage.complete) setIsLoading(false);
      };
      backImage.onload = () => {
        if (frontImage.complete) setIsLoading(false);
      };
    }
  }, [pokemon]);

  if (isLoading || !pokemon) {
    return <Loader />;
  }

  const toggleClick = () => {
    setTimeout(() => {
      setIsAnimating(false);
      setIsClicked((prev) => !prev);
    }, 600);
    setIsAnimating(true);
  };

  const handleToggleLike = (event) => {
    event.preventDefault();
    dispatch(toggleLike(pokemon.id));
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  let {
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
    isLiked,
  } = pokemon;

  name = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <div className="font-cartoon min-h-screen px-56 overflow-hidden bg-black flex flex-col items-center">
      <ScrollToTop />
      <header className="w-full py-3 flex justify-between items-center">
        <Link className="group flex items-center" onClick={() => navigate(-1)}>
          <ChevronLeftIcon className="group-hover:stroke-main w-10 h-10 cursor-pointer" />
          <p className="group-hover:text-main text-3xl">Back</p>
        </Link>
      </header>
      <main className="w-full flex flex-col items-center">
        <h1 className="text-center flex justify-center items-center gap-5">
          <span className="w-14 h-14 mb-2 bg-slate-400 inline-block">img</span>
          <div>
            <span style={{ color: pokemon.color }} className={"text-5xl"}>
              {name}
            </span>
            <span
              style={{ color: pokemon.color }}
              className="font-korean text-2xl ml-3"
            >
              ({krName})
            </span>
          </div>
        </h1>
        <section className="flex justify-center gap-10">
          <div className="w-[250px] my-10 cursor-pointer flex flex-col justify-center items-center">
            <div className="flex flex-col items-center group">
              {isLoading ? (
                <Loader className="loader w-[250px]">로딩 중...</Loader>
              ) : isClicked ? (
                <img
                  className={`h-56 ${isAnimating ? "animate-spin-once" : ""}`}
                  src={backGif}
                  alt={pokemonName}
                  onClick={toggleClick}
                  onLoad={handleImageLoad}
                />
              ) : (
                <img
                  className={`h-56 ${isAnimating ? "animate-spin-once" : ""}`}
                  src={frontGif}
                  alt={pokemonName}
                  onClick={toggleClick}
                  onLoad={handleImageLoad}
                />
              )}
              <p className="my-5 group-hover:text-main">Click to rotate</p>
            </div>

            <div
              style={{ borderColor: pokemon.isLiked ? "#b91c1c" : "white" }}
              className="group  w-24 p-1 border-2 rounded-md cursor-pointer flex justify-center items-center gap-2"
              onClick={handleToggleLike}
            >
              {pokemon.isLiked ? (
                <>
                  <HeartSolidIcon className="w-5 h-5 fill-main" />
                  <p className="text-xl text-main">Liked!</p>
                </>
              ) : (
                <>
                  <HeartIcon className="w-5 h-5 group-hover:animate-pulse group-hover:stroke-main" />
                  <p className="text-xl group-hover:text-main">Like? </p>
                </>
              )}
            </div>
            {/* 
              스탯 탭 적용 예정
            */}
          </div>
          <div className="has-[p,h2]:font-korean w-[400px] h-32 pt-10 text-xl flex flex-col gap-2">
            <h2 className="text-3xl mb-5 border-b-2 pb-3">기본 정보</h2>
            <p className="">
              신장 : <span>{`${height}m`}</span>
            </p>
            <p className="">
              몸무게 : <span>{`${weight}kg`}</span>
            </p>
            <p className="">메인 능력: {abilities.join(", ")}</p>
            <p className="">속성: {properties.join(", ")}</p>
            <p className="">경험치: {baseExp}</p>
            <p>포획율: {`${captureRate}%`}</p>
          </div>
        </section>
        <section className="has-[p,h2]:font-korean my-5 w-[690px]">
          <h2 className=" text-3xl mb-5 border-b-2 pb-3">포켓몬 일지</h2>
          <ul className="list-disc list-inside flex flex-col text-xl gap-3">
            {krFlavorText.map((text, index) => (
              <li className="flex" key={index}>
                <CheckIcon className="size-5 mr-3" />
                {text}
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}
