import { Link } from "react-router-dom";
import Sort from "./Sort";
import useCurrentPath from "@/hooks/useCurrentPath";
import SearchBar from "./SearchBar";

let links = [
  {
    status: "All Tasks",
    value: "all-tasks",
    active: true,
  },
  {
    status: "On Going",
    value: "ongoing",
    active: false,
  },
  {
    status: "Completed",
    value: "completed",
    active: false,
  },
  {
    status: "Upcoming",
    value: "upcoming",
    active: false,
  },
  {
    status: "Paused",
    value: "paused",
    active: false,
  },
];

function TaskHeader() {
  const currentPath = useCurrentPath(2) || "all-tasks";
  return (
    <div className="flex lg:flex-row flex-col space-y-10 lg:space-y-0 justify-between">
      <div>
        <ul className="flex gap-[40px] overflow-x-auto whitespace-no-wrap ">
          {links.map((item, i) => {
            return (
              <Link
                to={`/dashboard/${item.value}`}
                key={i}
                className="text-[14px] flex-none h-[25px] font-medium transition-all cursor-pointer border-white"
                style={
                  item.value === currentPath
                    ? { borderBottomWidth: 1 }
                    : { borderBottomWidth: 0 }
                }
              >
                {item.status}
              </Link>
            );
          })}
        </ul>
      </div>
      <div className="flex justify-between">
        <div className="lg:hidden">
          <SearchBar />
        </div>
        <Sort />
      </div>
    </div>
  );
}

export default TaskHeader;
