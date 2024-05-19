import { PlusSquare } from "lucide-react";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import LoginAlert from "./LoginAlert";
import { Task } from "@/interfaces/task-interfaces";
import NewTask from "./NewTask";

function TaskTemplate() {
  const tasks = useSelector((state: RootState) => state.taskSlice.tasks);
  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="sidebarLinksTitle">TASKS</p>
        {localStorage.getItem("token") ? (
          <NewTask>
            <PlusSquare
              width={20}
              height={20}
              color="#6C717B"
              className={"cursor-pointer"}
            />
          </NewTask>
        ) : (
          <LoginAlert>
            <PlusSquare
              width={20}
              height={20}
              color="#6C717B"
              className={"cursor-pointer"}
            />
          </LoginAlert>
        )}
      </div>
      <div className="overflow-y-auto max-h-[150px] space-y-2 hide-scrollbar">
        {tasks.map((item: Task, i: number) => {
          return (
            <div key={i} className="flex flex-col justify-top ">
              <p className={`sidebarLinks font-poppins transition-all`}>
                <span>{item.title}</span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TaskTemplate;
