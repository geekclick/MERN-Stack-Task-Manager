import { createHeaders } from "@/helpers";
import { Project } from "@/interfaces/task-interfaces";
import { setProjectList } from "@/store/reducers/projectSlice";
import axios, { AxiosError } from "axios";
import { FormEvent } from "react";
import { Dispatch } from "redux";

export const getProjectList = async (dispatch: Dispatch<any>) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const headers = {
        authorization: `Bearer ${token}`,
      };
      const response = await axios.get(
        `${window.location.origin}/api/projects`,
        { headers }
      );
      if (response) {
        dispatch(setProjectList(response.data.data));
      }
    }
  } catch (error) {
    dispatch(setProjectList([]));
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

export const addProject = async (
  dispatch: Dispatch<any>,
  project: Project,
  navigate: (arg0: string) => void,
  e: FormEvent<HTMLFormElement>
) => {
  e.preventDefault();
  try {
    const headers = createHeaders();
    const response = await axios.post(
      `${window.location.origin}/api/projects`,
      project,
      { headers }
    );
    if (response) {
      getProjectList(dispatch);
      navigate("/projects");
    }
  } catch (error) {
    console.log(error);
  }
};

export const editProject = async (
  dispatch: Dispatch<any>,
  project: Project
) => {
  try {
    const response = await axios.put(
      `${window.location.origin}/api/edit-project`,
      project
    );
    if (response) {
      //   dispatch(createTask(project));
      getProjectList(dispatch);
    }
  } catch (error) {
    console.log(error);
  }
};

export const removeProject = async (
  dispatch: Dispatch<any>,
  props: Project
) => {
  try {
    const headers = createHeaders();
    const response = await axios.delete(
      `${window.location.origin}/api/projects/${props._id}`,
      {
        headers,
      }
    );
    if (response) {
      getProjectList(dispatch);
    }
  } catch (error) {
    console.log(error);
  }
};
