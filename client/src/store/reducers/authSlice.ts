import { AuthState, User } from "@/interfaces/task-interfaces";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const isToken = localStorage.getItem("token") !== null;
const initialState: AuthState = {
  isLoggedIn: isToken,
  user: {
    _id: "",
    username: "",
    email: "",
    password: "",
    projects: [],
    peers: [],
    notifications: [],
  },
  userList: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setUserList: (state, action: PayloadAction<User[]>) => {
      state.userList = action.payload;
    },
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setUser, setUserList, setIsLoggedIn } = authSlice.actions;

export default authSlice.reducer;
