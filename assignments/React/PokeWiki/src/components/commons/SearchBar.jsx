import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../pages/Search";
import useDebounce from "../../hooks/useDebounce";

export default function SearchBar() {
  const { keyword, setKeyword } = useContext(SearchContext);
  const [inputValue, setInputValue] = useState(keyword);
  const debouncedValue = useDebounce(inputValue, 300);

  useEffect(() => {
    setKeyword(debouncedValue);
  }, [debouncedValue, setKeyword]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="w-full h-20 flex gap-3 text-3xl justify-center items-center">
      <input
        className="font-korean min-w-[200px] w-1/4 h-10 pb-2 border-b-2 border-[#FEC20C] bg-transparent outline-none focus:border-red-700 text-center"
        type="text"
        placeholder="포켓몬 이름 입력"
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
}
