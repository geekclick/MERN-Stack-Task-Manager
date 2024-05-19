import { Task } from "@/interfaces/task-interfaces";
import { setTaskList } from "@/store/reducers/taskSlice";
import { Dispatch } from "@reduxjs/toolkit";

export const createHeaders = () => {
  const token = localStorage.getItem("token");
  const headers = {
    authorization: `Bearer ${token}`,
  };
  return headers;
};

export const sort = (value: string, taskList: Task[], dispatch: Dispatch) => {
  const sortCriteria: { [key: string]: (a: Task, b: Task) => number } = {
    name: (a, b) => a.title.localeCompare(b.title),
    date: (a, b) => {
      const dateA = a.createdDate ? new Date(a.createdDate).getTime() : 0;
      const dateB = b.createdDate ? new Date(b.createdDate).getTime() : 0;
      return dateA - dateB;
    },
  };

  const sortBy =
    value.endsWith("A") || value.endsWith("D")
      ? value.substring(0, value.length - 1) // Remove ascending/descending suffix
      : "title"; // Default sort by title

  const sortOrder = value.endsWith("D") ? -1 : 1;

  const sortedTasks = [...taskList].sort(
    (a, b) => sortOrder * sortCriteria[sortBy](a, b)
  );

  dispatch(setTaskList(sortedTasks));
};
