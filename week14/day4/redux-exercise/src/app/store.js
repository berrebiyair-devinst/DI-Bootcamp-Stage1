import { configureStore } from "@reduxjs/toolkit";
import { TodoSlice } from "../features/TodoSlice";
import dailyPlannerReducer from "../features/dailyPlannerSlice";

export const store = configureStore({
  reducer: {
    todos: TodoSlice.reducer,
    dailyPlanner: dailyPlannerReducer
  }
});