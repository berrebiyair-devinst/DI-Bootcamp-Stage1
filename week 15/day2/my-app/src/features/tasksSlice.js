import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [
    {
      id: 1,
      title: "Learn Redux",
      description: "Practice Redux Toolkit",
      categoryId: 1,
      completed: false,
      progress: 30,
    },
    {
      id: 2,
      title: "Practice React",
      description: "Build React components",
      categoryId: 2,
      completed: true,
      progress: 100,
    },
  ],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },

    removeTask: (state, action) => {
      state.tasks = state.tasks.filter(
        (task) => task.id !== action.payload
      );
    },

    editTask: (state, action) => {
      const { id, title, description } = action.payload;
      const task = state.tasks.find((task) => task.id === id);

      if (task) {
        task.title = title;
        task.description = description;
      }
    },

    updateTaskStatus: (state, action) => {
      const { id, completed, progress } = action.payload;
      const task = state.tasks.find((task) => task.id === id);

      if (task) {
        task.completed = completed;
        task.progress = Math.max(0, Math.min(100, progress));
      }
    },
  },
});

export const {
  addTask,
  removeTask,
  editTask,
  updateTaskStatus,
} = tasksSlice.actions;

export default tasksSlice.reducer;