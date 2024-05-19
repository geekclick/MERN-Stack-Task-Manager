import { combineReducers } from "redux";
import authReducer from "./reducers/authSlice"; // Assuming you have an auth reducer file
import taskReducer from "./reducers/taskSlice"; // Assuming you have an auth reducer file
import sidebarReducer from "./reducers/sidebarSlice"; // Assuming you have an auth reducer file
import projectReducer from "./reducers/projectSlice"; // Assuming you have an auth reducer file

// Define RootState

// Combine reducers
const rootReducer = combineReducers({
  authSlice: authReducer,
  taskSlice: taskReducer,
  sidebarSlice: sidebarReducer,
  projectSlice: projectReducer,
  // Add other reducers here
});

export default rootReducer;
