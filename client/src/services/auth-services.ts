import { User } from "@/interfaces/task-interfaces";
import { setIsLoggedIn } from "@/store/reducers/authSlice";
import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { FormEvent } from "react";

class AuthServices {
  async login(
    payload: User,
    navigate: (arg: string) => void,
    dispatch: Dispatch,
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    try {
      const response = await axios.post(`${window.location.origin}/api/auth/login`, payload);
      if (response) {
        const token = response.data.data.token;
        localStorage.setItem("token", token);
        localStorage.getItem("token");
        dispatch(setIsLoggedIn(true));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  signup = async (
    userInfo: User,
    navigate: (args: string) => void,
    dispatch: Dispatch,
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${window.location.origin}/api/auth/signup`, userInfo);
      if (response) {
        const token = response.data.data.token;
        localStorage.setItem("token", token);
        dispatch(setIsLoggedIn(true));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  logout = async (dispatch: Dispatch) => {
    try {
      localStorage.removeItem("token");
      dispatch(setIsLoggedIn(false));
    } catch (error) {
      console.log(error);
    }
  };
}

const authServices = new AuthServices();
export default authServices;
