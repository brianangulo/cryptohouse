import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    faqInfo: [],
    price: 0.00,
    gpu: "RTX3060",
  },
  reducers: {
    getFaqs: (state, action) => {
      state.faqInfo = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setGpu: (state, action) => {
      state.gpu = action.payload;
    }
  },
});

export const { getFaqs, setGpu, setPrice } = appSlice.actions;

export default appSlice.reducer;