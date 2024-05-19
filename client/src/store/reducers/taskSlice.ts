import { Task, TaskList } from "@/interfaces/task-interfaces";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: TaskList = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTaskList: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
  },
});

export const { setTaskList } = taskSlice.actions;

export default taskSlice.reducer;
