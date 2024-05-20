import { Task } from "@/interfaces/task-interfaces";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

export const handleChange = (
  e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  setTask: Dispatch<SetStateAction<Task>>
) => {
  const { name, value } = e.target;
  setTask((prevTask) => {
    if (name === "tags") {
      return {
        ...prevTask,
        tags: value.split(",").map((tag) => tag.trim()),
      };
    } else {
      return {
        ...prevTask,
        [name]: value,
      };
    }
  });
};
