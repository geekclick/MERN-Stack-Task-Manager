import { getProjectList } from "@/services/project-sevices";
import { getTaskList } from "@/services/task-services";
import { profile } from "@/services/user-services";
import { RootState } from "@/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function useInit() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(
    (state: RootState) => state.authSlice.isLoggedIn
  );
  useEffect(() => {
    getProjectList(dispatch);
    getTaskList(dispatch);
    profile(dispatch);
  }, [isLoggedIn]);
  return;
}

export default useInit;
