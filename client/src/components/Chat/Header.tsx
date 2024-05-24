import { ArrowLeft, User } from "lucide-react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="h-10 z-10 bg-[#232529] border-b border-gray-400/20 w-screen flex justify-between items-center px-3">
      <Link to={"/"}>
        <ArrowLeft />
      </Link>
      <div className="flex space-x-2">
        <h1>Anuj</h1>
        <User />
      </div>
    </div>
  );
}

export default Header;
