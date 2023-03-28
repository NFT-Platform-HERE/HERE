import { createSlice } from "@reduxjs/toolkit";

interface selectedOrganizationNFTState {
  selectedOrganizationNFT: number;
}

const initialState: selectedOrganizationNFTState = {
  selectedOrganizationNFT: 0,
};

const submitSelectedOrganizationNFTSlice = createSlice({
  name: "submitSelectedOrganizationNFT",
  initialState,
  reducers: {
    selectNFT(state, action) {
      state.selectedOrganizationNFT = action.payload;
    },
    clearNFTList(state) {
      state.selectedOrganizationNFT = 0;
    },
  },
});

export const { selectNFT, clearNFTList } =
  submitSelectedOrganizationNFTSlice.actions;

export default submitSelectedOrganizationNFTSlice.reducer;
