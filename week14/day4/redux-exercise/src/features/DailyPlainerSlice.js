
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dailyPlan: {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: []
  }
};

const dailyPlannerSlice = createSlice({
  name: "dailyPlanner",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { day, task } = action.payload;
      state.dailyPlan[day].push(task);
    },

    editTask: (state, action) => {
      const { day, index, updatedTask } = action.payload;
      state.dailyPlan[day][index] = updatedTask;
    },

    deleteTask: (state, action) => {
      const { day, index } = action.payload;
      state.dailyPlan[day] = state.dailyPlan[day].filter(
        (_, i) => i !== index
      );
    }
  }
});

export const { addTask, editTask, deleteTask } =
  dailyPlannerSlice.actions;

export default dailyPlannerSlice.reducer;
