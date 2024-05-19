import { motion } from "framer-motion";
import { LogOut } from "lucide-react";
import Logo from "./Logo";
import MainMenu from "./MainMenu";
import TaskTemplate from "./TaskTemplate";
import LogoutConfirm from "./LogoutConfirm";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Login from "./Login";
import { Button } from "./ui/button";
import ProjectTemplate from "./ProjectTemplate";

function Sidebar() {
  const sidebarOpen: Boolean = useSelector(
    (state: RootState) => state.sidebarSlice.sidebarOpen
  );

  return (
    <motion.section
      initial={{ x: -302 }} // Initial position outside of the viewport
      animate={{ x: sidebarOpen ? 0 : -302 }} // Slide in/out animation
      transition={{ duration: 0.3 }} // Animation duration
      className="fixed z-20 h-full w-[302px] p-[24px] bg-[#1B1D21] flex flex-col space-y-6"
    >
      <Logo sidebarOpen={sidebarOpen} />
      <MainMenu />
      <TaskTemplate />
      <ProjectTemplate title="PROJECTS" />
      <div className="bg-[#323539] w-[254px] h-px"></div>
      {localStorage.getItem("token") ? (
        <div className="absolute bottom-[10px]">
          <ul>
            <LogoutConfirm>
              <li className="sidebarLinks flex gap-2">
                <LogOut />
                <p>Log Out</p>
              </li>
            </LogoutConfirm>
            {/* <li className="sidebarLinks flex gap-2">
            <Settings />
            <p>Settings</p>
          </li> */}
          </ul>
        </div>
      ) : (
        <Login>
          <Button>Log in</Button>
        </Login>
      )}
    </motion.section>
  );
}

export default Sidebar;
