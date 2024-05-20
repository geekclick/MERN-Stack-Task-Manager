import { setUser, setUserList } from "@/store/reducers/authSlice";
import axios, { AxiosError } from "axios";
import { Dispatch } from "redux";

export const getAllUsers = async (dispatch: Dispatch<any>) => {
  try {
    const response = await axios.get(`${window.location.origin}/api/users`);
    if (response) {
      dispatch(setUserList(response.data));
    }
  } catch (error) {
    dispatch(setUserList([]));
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

export const profile = async (dispatch: Dispatch<any>) => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      authorization: `Bearer ${token}`,
    };
    const user = await axios.get(
      `${window.location.origin}/api/users/profile`,
      {
        headers,
      }
    );
    if (user) {
      dispatch(setUser(user.data.data));
    }
  } catch (error) {
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

export const getUser = async (dispatch: Dispatch<any>) => {
  try {
    const userId = localStorage.getItem("userId");
    const response = await axios.post(
      `${window.location.origin}/api/users/${userId}`
    );
    if (response) {
      dispatch(setUser(response.data));
    }
  } catch (error) {
    // dispatch(setUser());
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
