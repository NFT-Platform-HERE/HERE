import { createSlice } from "@reduxjs/toolkit";

interface mobileHeaderProfileDropdownState {
  isOpen: boolean;
}

const initialState: mobileHeaderProfileDropdownState = {
  isOpen: false,
};

const mobileHeaderProfileDropdownSlice = createSlice({
  name: "mobileHeaderProfileDropdown",
  initialState,
  reducers: {
    openMobileHeaderProfileDropdown(state) {
      state.isOpen = true;
    },
    closeMobileHeaderProfileDropdown(state) {
      state.isOpen = false;
    },
  },
});

export const {
  openMobileHeaderProfileDropdown,
  closeMobileHeaderProfileDropdown,
} = mobileHeaderProfileDropdownSlice.actions;

export default mobileHeaderProfileDropdownSlice.reducer;
