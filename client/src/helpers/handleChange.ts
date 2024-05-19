import { Task } from "@/interfaces/task-interfaces";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

export const handleChange = (
  e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  setTask: Dispatch<SetStateAction<Task>> | undefined
) => {
  const { name, value } = e.target;
  if (setTask) {
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  }
};
