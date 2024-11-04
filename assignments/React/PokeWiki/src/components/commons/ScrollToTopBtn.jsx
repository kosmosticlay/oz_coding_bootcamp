import { ArrowUpIcon } from "@heroicons/react/24/outline";

ArrowUpIcon;

export default function ScrollToTopBtn() {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <button
      onClick={handleScrollToTop}
      className="group fixed bottom-10 right-10 w-16 h-16 flex justify-center items-center border-4 hover:border-main rounded-lg active:scale-90 transform transition-transform duration:100"
    >
      <ArrowUpIcon className="group-hover:stroke-main size-8 stroke-2" />
    </button>
  );
}
