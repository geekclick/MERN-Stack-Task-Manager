import { combineReducers } from "redux";
import authReducer from "./reducers/authSlice";
import taskReducer from "./reducers/taskSlice";
import sidebarReducer from "./reducers/sidebarSlice";
import projectReducer from "./reducers/projectSlice";
import loaderReducer from "./reducers/loaderSlice";

// Combine reducers
const rootReducer = combineReducers({
  authSlice: authReducer,
  taskSlice: taskReducer,
  sidebarSlice: sidebarReducer,
  projectSlice: projectReducer,
  loaderSlice: loaderReducer,
  // Add other reducers here
});

export default rootReducer;
