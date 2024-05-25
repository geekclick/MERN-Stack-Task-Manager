import useCurrentPath from "@/hooks/useCurrentPath";
import { DashboardLink } from "@/interfaces/task-interfaces";
import { LayoutDashboard, Clipboard } from "lucide-react";
import { Link } from "react-router-dom";

const dashboardLinks: DashboardLink[] = [
  {
    label: "Dashboard",
    icon: <LayoutDashboard />,
    link: "/dashboard",
  },
  { label: "Projects", icon: <Clipboard />, link: "/projects" },
];

function MainMenu() {
  const currentPath = "/" + useCurrentPath(1);
  const setPath = currentPath == "/" ? "/dashboard" : currentPath;
  return (
    <div>
      <p className="sidebarLinksTitle">MAIN MENU</p>
      <ul>
        {dashboardLinks.map((item, i) => {
          return (
            <li key={i}>
              <Link
                to={item.link}
                className="flex items-center mt-3 gap-1 justify-left text-[#6C717B] cursor-pointer text-[16px]"
              >
                <span
                  className={`${setPath == item.link ? "text-primary" : ""}`}
                >
                  {item.icon}
                </span>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default MainMenu;
