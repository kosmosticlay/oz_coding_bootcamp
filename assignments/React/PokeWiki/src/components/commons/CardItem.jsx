import { useState } from "react";
import { useDispatch } from "react-redux";

/* icons */
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { toggleLike } from "../../RTK/pokemonSlice";

export default function CardItem({ pokemon }) {
  const [isHovered, setIsHovered] = useState(false);

  const dispatch = useDispatch();

  const handleToggleLike = (event) => {
    event.preventDefault();
    dispatch(toggleLike(pokemon.id));
  };

  const borderColor = isHovered ? pokemon.color : "black";
  const textColor = pokemon.color;

  return (
    <div className="relative w-56 h-80">
      {/* 뒤에 배경이 되는 div */}
      <div
        className={`absolute top-3 left-3 w-full h-full rounded-md transition-transform duration-300 ${
          isHovered ? "translate-x-2 translate-y-2" : ""
        }`}
        style={{ backgroundColor: textColor }}
      ></div>

      {/* 카드 본체 */}
      <div
        className={`relative z-10 w-full h-full bg-black border-2 border-white rounded-md transition-transform duration-300 ${
          isHovered ? "-translate-x-2 translate-y-[-10px]" : ""
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="z-20 top-4 right-4 absolute size-7 cursor-pointer"
          onClick={handleToggleLike}
        >
          {pokemon.isLiked ? (
            <HeartSolidIcon className="w-7 h-7 fill-red-700" />
          ) : (
            <HeartIcon className="w-7 h-7 text-gray-500" />
          )}
        </div>
        <div className="h-full flex flex-col py-5 justify-center items-center">
          <img
            className="h-32 my-5"
            src={pokemon.imageUrl.mainImg}
            alt={pokemon.name}
          />
          <div className="flex-grow w-full flex flex-col items-center">
            <h2
              className="font-cartoon text-4xl"
              style={{ color: textColor, borderColor }}
            >
              {pokemon.name}
            </h2>
            <p
              className="text-xl font-korean"
              style={{ color: textColor, borderColor }}
            >
              {pokemon.krName}
            </p>
          </div>
          {isHovered && (
            <div className="px-3 py-1 rounded-md bg-white text-black font-korean">
              상세보기
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
