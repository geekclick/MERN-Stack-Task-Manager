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
          setStatusColor("text-blue-500");
        }
        if (task?.task_status === "completed") {
          setStatusColor("text-green-500");
        }
        if (task?.task_status === "upcoming") {
          setStatusColor("text-yellow-500");
        }
        if (task?.task_status === "paused") {
          setStatusColor("text-red-500");
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
