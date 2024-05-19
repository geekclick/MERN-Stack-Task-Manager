import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import SearchBar from "./SearchBar";
import ProfileImage from "@/assets/profile.png";
import { useLocation } from "react-router-dom";
// import { ModeToggle } from "./mode-toggle";
import ProfileDropdown from "./ProfileDropdown";
import { useDispatch, useSelector } from "react-redux";
import Login from "./Login";
import { Button } from "./ui/button";
import { Menu, PlusIcon } from "lucide-react";
import { setSidebar } from "@/store/reducers/sidebarSlice";
import AddTask from "./AddTask";
import AddProject from "./AddProject";
import Notification from "./Notification";
import { RootState } from "@/interfaces/task-interfaces";
import useCurrentPath from "@/hooks/useCurrentPath";
import NewTask from "./NewTask";
import { useState } from "react";

function Navbar() {
  const currentPath = useCurrentPath(1);
  const dispatch = useDispatch();
  const [animation, setAnimation] = useState("");
  const page = useLocation().pathname.split("/")[1];
  const { isLoggedIn } = useSelector((state: RootState) => state.authSlice);
  return (
    <nav className="fixed z-10 flex lg:py-[24px] lg:px-[40px] px-[10px] justify-between items-center min-w-full h-[90px] bg-[#232529] border-b border-[#323539]">
      <div className="flex items-center">
        <button onClick={() => dispatch(setSidebar(true))}>
          <Menu className="text-white" />
        </button>
        <h1 className="text-white font-poppins lg:text-[32px] text-[24px] px-[10px] font-medium lg:px-[40px] text capitalize">
          {page.length == 0 ? "Dashboard" : page}
        </h1>
      </div>
      <div className="flex items-center gap-[20px]">
        <Notification />
        {currentPath != "projects" ? (
          <>
            {isLoggedIn && (
              <>
                <NewTask>
                  <Button
                    variant={"ghost"}
                    className="focus-visible:border-none md:flex hidden"
                  >
                    <PlusIcon
                      className={`mx-1 scale-75 ${animation}`}
                      onMouseEnter={() => setAnimation("animate-spin")}
                      onMouseLeave={() => setAnimation("")}
                    />
                    New Task
                  </Button>
                </NewTask>
                <NewTask>
                  <Button className="bg-transparent focus-visible:border-none md:hidden">
                    <PlusIcon className="scale-75" />
                  </Button>
                </NewTask>
              </>
            )}
          </>
        ) : (
          <AddProject>
            <Button className="bg-transparent focus-visible:border-none md:flex hidden">
              <PlusIcon className="mx-1 scale-75" />
              New Project
            </Button>
          </AddProject>
        )}
        <div className="lg:block hidden">
          <SearchBar />
        </div>
        {/* <ModeToggle /> */}
        {isLoggedIn ? (
          <ProfileDropdown>
            <Avatar>
              <AvatarImage src={ProfileImage} />
              <AvatarFallback>PL</AvatarFallback>
            </Avatar>
          </ProfileDropdown>
        ) : (
          <Login>
            <Button>Log in</Button>
          </Login>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
