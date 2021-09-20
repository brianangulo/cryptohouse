import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    isSignedIn: false,
  },
  reducers: {
    setIsSignedIn: (state, action) => {
      state.isSignedIn = action.payload;
    }
  },
});

export const { setIsSignedIn } = appSlice.actions;

export default appSlice.reducer;