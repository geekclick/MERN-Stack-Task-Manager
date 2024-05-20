import { Task } from "@/interfaces/task-interfaces";
import { editTask } from "@/services/task-services";
import { Dispatch, SetStateAction, useEffect } from "react";

function useChangeColor(
  task: Task,
  setStatusColor: Dispatch<SetStateAction<string>>,
  edit: boolean
) {
  if (task) {
    useEffect(() => {
      const changeColor = () => {
        if (task?.task_status === "ongoing") {
          setStatusColor("blue");
        }
        if (task?.task_status === "completed") {
          setStatusColor("green");
        }
        if (task?.task_status === "upcoming") {
          setStatusColor("yellow");
        }
        if (task?.task_status === "paused") {
          setStatusColor("red");
        }
      };
      changeColor();
      if (edit) {
        editTask(task);
      }
    }, [task?.task_status]);
  }
  return;
}

export default useChangeColor;
