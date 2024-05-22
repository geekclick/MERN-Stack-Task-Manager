import { Loader } from "@/components/Loader";
import TaskCard from "@/components/TaskCard";
import useCurrentPath from "@/hooks/useCurrentPath";
import { Project, Task } from "@/interfaces/task-interfaces";
import { RootState } from "@/store";
import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ProjectCard = lazy(() => import("@/components/ProjectCard"));

function Projects() {
  const { id } = useParams();
  const projects: Project[] = useSelector(
    (state: RootState) => state.projectSlice.projects
  );
  const tasks = useSelector((state: RootState) => state.taskSlice.tasks).filter(
    (t) => t.project == id
  );
  const isLoggedIn = useSelector(
    (state: RootState) => state.authSlice.isLoggedIn
  );

  if (useCurrentPath(1) === "projects" && useCurrentPath(2) != null) {
    if (tasks) {
      return (
        <div className="grid lg:grpid-cols-4 md:grid-cols-2 xl:grid-cols-5 lg:self-auto self-center gap-10 w-full h-full justify-center">
          {tasks.length > 0 ? (
            tasks.map((task: Task, i) => <TaskCard key={i} {...task} />)
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
      {projects.length !== 0 && isLoggedIn ? (
        projects.map((project: Project) => (
          <Suspense fallback={<Loader key={project._id} />}>
            <ProjectCard key={project?._id} {...project} />
          </Suspense>
        ))
      ) : (
        <h2>No ongoing projects</h2>
      )}
    </div>
  );
}

export default Projects;
