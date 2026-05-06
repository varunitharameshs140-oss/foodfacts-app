import { createSlice } from "@reduxjs/toolkit";

const savedSlice = createSlice({
  name: "saved",

  initialState: {
    items: [],
  },

  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
  },
});

export const { addItem } = savedSlice.actions;

export default savedSlice.reducer;