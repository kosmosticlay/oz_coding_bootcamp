import { Link, useLocation } from "react-router-dom";

/* icons */
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import Poketball from "./commons/Poketball";

export default function Header() {
  const location = useLocation();

  return (
    <header className="w-full h-14 font-cartoon flex border-box">
      <img className="w-44 h-full mr-3 p-2" src="../logo.png" />
      <div className="flex-grow text-xl flex items-center justify-between">
        <div className="flex items-center relative">
          <Link className="flex justify-center items-center relative" to="/">
            <p
              className={`hover:text-red-700 w-28 text-center ${
                location.pathname === "/" ? "text-red-700" : "text-white"
              }`}
            >
              Home
            </p>
          </Link>
          <Link
            className="hover:text-red-700 flex justify-center items-center relative"
            to="/search"
          >
            <p
              className={`hover:text-red-700 w-28 text-center ${
                location.pathname === "/search" ? "text-red-700" : "text-white"
              }`}
            >
              Search
            </p>
          </Link>
          <div
            className={`absolute transition-transform duration-300 ${
              location.pathname === "/"
                ? "translate-x-2"
                : location.pathname === "/search"
                ? "translate-x-[7rem]"
                : "hidden"
            }`}
          >
            <Poketball />
          </div>
        </div>
        <div className="flex items-center">
          {location.pathname === "/favorites" ? (
            <Link to="/favorites">
              <HeartSolidIcon className="w-7 h-7 mr-8 cursor-pointer fill-red-700" />
            </Link>
          ) : (
            <Link to="/favorites">
              <HeartIcon className="w-7 h-7 mr-8 cursor-pointer hover:stroke-red-700" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
