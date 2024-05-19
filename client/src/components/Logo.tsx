import { Link } from "react-router-dom";
import logoImage from "/task-svg.svg";
import { useDispatch } from "react-redux";
import { setSidebar } from "@/store/reducers/sidebarSlice";
import { ChevronsLeft } from "lucide-react";

function Logo({ sidebarOpen }: { sidebarOpen: Boolean }) {
  const dispatch = useDispatch();

  return (
    <div className="flex space-x-2 justify-left items-center">
      <Link to={"/dashboard"}>
        <img
          src={logoImage}
          alt="#"
          width={25}
          height={25}
          className="rounded-full aspect-square"
        />
      </Link>
      <Link
        to="/dashboard"
        className="text-xl font-thin font-poppins text-white"
      >
        Task Manager
      </Link>
      <button
        onClick={() => dispatch(setSidebar(false))}
        className="text-white absolute right-4"
      >
        {sidebarOpen && <ChevronsLeft />}
      </button>
    </div>
  );
}

export default Logo;
