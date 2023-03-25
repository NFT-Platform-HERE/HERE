import { createSlice } from "@reduxjs/toolkit";

interface webHeaderDropdownState {
  isOpen: boolean;
}

const initialState: webHeaderDropdownState = {
  isOpen: false,
};

const webHeaderDropdown = createSlice({
  name: "webHeaderDropdown",
  initialState,
  reducers: {
    openWebHeaderDropdown(state) {
      state.isOpen = true;
    },
    closeWebHeaderDropdown(state) {
      state.isOpen = false;
    },
  },
});

export const { openWebHeaderDropdown, closeWebHeaderDropdown } =
  webHeaderDropdown.actions;

export default webHeaderDropdown.reducer;
