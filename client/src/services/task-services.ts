import { createHeaders } from "@/helpers";
import { Task } from "@/interfaces/task-interfaces";
import { setTaskList } from "@/store/reducers/taskSlice";
import axios, { AxiosError } from "axios";
import { Dispatch } from "redux";

export const getTaskList = async (dispatch: Dispatch<any>) => {
  try {
    const headers = createHeaders();
    const response = await axios.get(`${window.location.origin}/api/tasks`, {
      headers,
    });
    if (response) {
      dispatch(setTaskList(response.data.data));
    } else return null;
  } catch (error) {
    dispatch(setTaskList([]));
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        console.log(axiosError.response.data);
      } else {
        console.error(error);
      }
    }
  }
};

export const addTask = async (
  dispatch: Dispatch<any>,
  task: Task,
  navigate: (arg0: string) => void
) => {
  try {
    const headers = createHeaders();
    const response = await axios.post(
      `${window.location.origin}/api/tasks`,
      task,
      { headers }
    );
    if (response) {
      getTaskList(dispatch);
      navigate("/dashboard");
    }
  } catch (error) {
    console.log(error);
  }
};

export const editTask = async (dispatch: Dispatch<any>, task: Task) => {
  try {
    const headers = createHeaders();
    const response = await axios.put(
      `${window.location.origin}/api/tasks/`,
      task,
      {
        headers,
      }
    );
    if (response) {
      getTaskList(dispatch);
    }
  } catch (error) {
    console.log(error);
  }
};

export const removeTask = async (dispatch: Dispatch<any>, props: Task) => {
  try {
    const headers = createHeaders();
    const response = await axios.delete(
      `${window.location.origin}/api/tasks/${props._id}`,
      { headers }
    );
    if (response) {
      getTaskList(dispatch);
    }
  } catch (error) {
    console.log(error);
  }
};

export const searchTask = async (dispatch: Dispatch<any>, query: string) => {
  try {
    const headers = createHeaders();
    const response = await axios.get(
      `${window.location.origin}/api/tasks/search?q=${query}`,
      {
        headers,
      }
    );
    if (response) {
      dispatch(setTaskList(response.data.data));
    }
  } catch (error) {
    console.log(error);
  }
};
