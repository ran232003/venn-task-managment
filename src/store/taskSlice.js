import { createSlice } from "@reduxjs/toolkit";
const TaskSlice = createSlice({
  name: "task",
  initialState: { userTasks: [], statusCounts: [] },
  reducers: {
    setUserTasks(state, action) {
      state.userTasks = action.payload;
    },
    setStatusCounts(state, action) {
      state.statusCounts = action.payload;
    },
    removeUser(state) {
      state.user = null;
    },
  },
});

export default TaskSlice;

export const taskAction = TaskSlice.actions;
