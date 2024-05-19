import { searchTask } from "@/services/task-services";
import { Search } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function SearchBar() {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuery(value);
  };
  useEffect(() => {
    searchTask(dispatch, query);
  }, [query]);
  return (
    <div className="relative w-fit h-fit">
      <input
        className="lg:w-[265px] lg:h-[45px] rounded-[16px] outline-none bg-[#2A2D33] text-[#cdd0d5] m-auto lg:flex px-4 w-[200px] h-12 "
        placeholder="Search"
        value={query}
        onChange={(e) => handleChange(e)}
      />
      <Search
        className="absolute lg:top-3 lg:right-4 top-4 right-4 text-[#6C717B] cursor-pointer"
        width={20}
        height={20}
      />
    </div>
  );
}

export default SearchBar;
