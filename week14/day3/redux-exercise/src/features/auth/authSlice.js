import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    updateUserInfo: (state, action) => {
      state.user = { ...state.user, ...action.payload };

    }
  }
});

export const { login, logout, updateUserInfo } = authSlice.actions;
export default authSlice.reducer;