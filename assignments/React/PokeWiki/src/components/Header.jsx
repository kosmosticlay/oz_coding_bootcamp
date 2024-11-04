import { Link, useLocation } from "react-router-dom";

/* icons */
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import Poketball from "./commons/Poketball";

export default function Header() {
  const location = useLocation();

  return (
    <header className="z-20 fixed top-0 bg-black w-full h-24 font-cartoon flex border-box mb-5">
      <img className="w-52 h-full mx-8 p-2" src="../logo.png" />
      <div className="flex-grow text-xl flex items-center justify-between">
        <div className="flex items-center relative">
          <Link className="flex justify-center items-center relative" to="/">
            <p
              className={`hover:text-main w-40 text-3xl text-center ${
                location.pathname === "/" ? "text-main" : "text-white"
              }`}
            >
              Home
            </p>
          </Link>
          <Link
            className="hover:text-main flex justify-center items-center relative"
            to="/search"
          >
            <p
              className={`hover:text-main w-40 text-3xl text-center ${
                location.pathname === "/search" ? "text-main" : "text-white"
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
                ? "translate-x-[9.75rem]"
                : "hidden"
            }`}
          >
            <Poketball />
          </div>
        </div>
        <div className="flex items-center">
          {location.pathname === "/favorites" ? (
            <Link to="/favorites">
              <HeartSolidIcon className="w-10 h-10 mr-10 cursor-pointer fill-main" />
            </Link>
          ) : (
            <Link to="/favorites">
              <HeartIcon className="w-10 h-10 mr-10 cursor-pointer hover:stroke-main" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
