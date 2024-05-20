import { createHeaders } from "@/helpers";
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
  const tasks = useSelector((state: RootState) => state.taskSlice.tasks);
  const headers = createHeaders();
  useEffect(() => {
    if (headers.authorization.slice(7) != "null") {
      getProjectList(dispatch);
      getTaskList(dispatch);
      profile(dispatch);
    }
  }, [isLoggedIn, tasks]);
  return;
}

export default useInit;
