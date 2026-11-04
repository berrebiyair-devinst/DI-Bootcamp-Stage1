import { TodoSlice } from "../features/TodoSlice";
import { configureStore } from "@reduxjs/toolkit";
import { dailyPlannerSlice } from "../features/DailyPlainer";
export const store = configureStore({
    reducer: {
        todos: TodoSlice.reducer,
        dailyPlanner: dailyPlannerSlice.reducer
    }
})