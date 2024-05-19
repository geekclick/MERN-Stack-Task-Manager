import ProjectCard from "@/components/ProjectCard";
import TaskCard from "@/components/TaskCard";
import { Project, Task } from "@/interfaces/task-interfaces";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";

function Projects() {
  const { pathname } = useLocation();
  const currentPath = pathname.split("/");
  const projects: Project[] = useSelector(
    (state: RootState) => state.projectSlice.projects
  );
  const { id } = useParams();

  if (currentPath[1] === "projects" && currentPath[2] != null) {
    const project = projects.find(
      (project) => project?.title?.toLowerCase().replace(" ", "-") === id
    );
    if (project) {
      return (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 xl:grid-cols-5 lg:self-auto self-center gap-10 w-full h-full justify-center">
          {project.related_tasks?.length > 0 ? (
            project.related_tasks.map((task: Task, i) => (
              // <TaskCard key={i} {...task} />
              <div>yehi galat hai</div>
            ))
          ) : (
            <h2>No tasks for this project</h2>
          )}
        </div>
      );
    } else {
      return <div>No project found!</div>;
    }
  }

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 xl:grid-cols-5 lg:self-auto self-center gap-10 w-full h-full justify-center">
      {projects.length !== 0 && localStorage.getItem("token") ? (
        projects.map((project: Project) => (
          <ProjectCard key={project?._id} {...project} />
        ))
      ) : (
        <h2>No ongoing projects</h2>
      )}
    </div>
  );
}

export default Projects;
