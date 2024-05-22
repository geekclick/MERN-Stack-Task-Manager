import { Link } from "react-router-dom";
import { useState } from "react";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { Project } from "@/interfaces/task-interfaces";
import useCurrentPath from "@/hooks/useCurrentPath";

function ProjectTemplate({ title }: { title: string }) {
  const currentPath = useCurrentPath(1);
  const projects = useSelector(
    (state: RootState) => state.projectSlice.projects
  );
  const [selectedLink, setSelectedLink] = useState<number | null>(
    title === "TASKS" ? 0 : null
  );

  const handleClick = (index: number | null) => {
    setSelectedLink(index);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="sidebarLinksTitle">{title}</p>
        {/* {isLoggedIn ? (
          <AddTask>
            <PlusSquare
              width={20}
              height={20}
              color="#6C717B"
              className={"cursor-pointer"}
            />
          </AddTask>
        ) : (
          <LoginAlert>
            <PlusSquare
              width={20}
              height={20}
              color="#6C717B"
              className={"cursor-pointer"}
            />
          </LoginAlert>
        )} */}
      </div>
      <div className="overflow-y-auto max-h-[150px] space-y-2 hide-scrollbar">
        {localStorage.getItem("token") &&
          projects.map((item: Project, i) => {
            return (
              <div key={i} className="flex justify-start items-center">
                <div
                  onClick={() => handleClick(i)}
                  className={`sidebarLinks font-poppins transition-all flex justify-center items-center space-x-2 ${
                    selectedLink === i && currentPath == "projects"
                      ? "text-[#7864F4] font-semibold"
                      : "font-normal"
                  }`}
                >
                  <div
                    className={`w-[6px] h-[24px] bg-[#7864F4] rounded-l-sm left-0 transition-all ${
                      selectedLink === i && currentPath == "projects"
                        ? ""
                        : "hidden"
                    }`}
                  ></div>
                  <Link
                    to={`/projects/${item._id
                      ?.toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {item.title}
                  </Link>
                  <div
                    className={`w-[6px] h-[24px] bg-[#7864F4] rounded-r-sm left-0 transition-all ${
                      selectedLink === i && currentPath == "projects"
                        ? ""
                        : "hidden"
                    }`}
                  ></div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default ProjectTemplate;
