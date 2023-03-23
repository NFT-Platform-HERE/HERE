import { createSlice } from "@reduxjs/toolkit";

interface mobileHeaderMenuDropdownState {
  isOpen: boolean;
}

const initialState: mobileHeaderMenuDropdownState = {
  isOpen: false,
};

const mobileHeaderMenuDropdownSlice = createSlice({
  name: "mobileHeaderMenuDropdown",
  initialState,
  reducers: {
    openMobileHeaderMenuDropdown(state) {
      state.isOpen = true;
    },
    closeMobileHeaderMenuDropdown(state) {
      state.isOpen = false;
    },
  },
});

export const { openMobileHeaderMenuDropdown, closeMobileHeaderMenuDropdown } =
  mobileHeaderMenuDropdownSlice.actions;

export default mobileHeaderMenuDropdownSlice.reducer;
