import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { HomeIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="w-full h-screen gap-5 flex flex-col justify-center items-center">
      <h1 className="text-yellow font-cartoon text-7xl">Page NotFound </h1>
      <img className="w-44 animate-spin-infinite" src={".././404.png"} />
      <p className="text-yellow font-korean text-3xl">
        페이지를 찾을 수 없습니다!
      </p>

      <Link
        to="/"
        className="active:scale-90 transition transition-form duration-300 mt-5 px-2 py-1 w-38 rounded-lg hover:bg-main bg-white flex gap-2 justify-center items-start"
      >
        <HomeIcon className="size-7 fill-black " />
        <p className="font-korean text-2xl text-black ">홈으로</p>
        <ArrowRightIcon className="size-7 stroke-black " />
      </Link>
    </div>
  );
}
