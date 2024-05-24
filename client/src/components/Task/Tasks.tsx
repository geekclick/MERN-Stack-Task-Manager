import { Suspense, lazy } from "react";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import NoTasks from "./NoTasks";
import { Task } from "@/interfaces/task-interfaces";
import useCurrentPath from "@/hooks/useCurrentPath";
import { Loader } from "../Loader";

// Add artificial delay for testing
const TaskCard = lazy(() => import("./TaskCard"));

function Tasks() {
  const currentPath = useCurrentPath(2) || "all-tasks";
  const tasks = useSelector((state: RootState) => state.taskSlice.tasks);

  const filteredTasks =
    currentPath === "all-tasks"
      ? tasks
      : tasks.filter((task: Task) => task.task_status === currentPath);

  return tasks.length !== 0 ? (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 xl:grid-cols-5 grid-flow-row lg:self-auto self-center gap-10 w-full h-full justify-center">
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task: Task) => (
          <Suspense key={task._id} fallback={<Loader key={task._id} />}>
            <TaskCard {...task} />
          </Suspense>
        ))
      ) : (
        <div className="col-span-full flex items-center justify-center h-full">
          <NoTasks />
        </div>
      )}
    </div>
  ) : (
    <NoTasks />
  );
}

export default Tasks;
