import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const cartToggleSlice = createSlice({
  name: "cartToggle",
  initialState,
  reducers: {
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggleCart } = cartToggleSlice.actions;
export default cartToggleSlice.reducer;
