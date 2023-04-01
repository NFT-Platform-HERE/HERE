import { createSlice } from "@reduxjs/toolkit";

interface selectedOrganizationNFTState {
  selectedOrganizationNFT: number;
  selectedOrganizationNFTInfo: { tokenId: number; hashValue: string };
}

const initialState: selectedOrganizationNFTState = {
  selectedOrganizationNFT: 0,
  selectedOrganizationNFTInfo: { tokenId: 0, hashValue: "0" },
};

const submitSelectedOrganizationNFTSlice = createSlice({
  name: "submitSelectedOrganizationNFT",
  initialState,
  reducers: {
    selectNFT(state, action) {
      state.selectedOrganizationNFT = action.payload;
    },
    setNFTInfo(state, action) {
      state.selectedOrganizationNFTInfo = action.payload;
    },
    clearNFTList(state) {
      state.selectedOrganizationNFT = 0;
    },
    clearNFTInfo(state) {
      state.selectedOrganizationNFTInfo = { tokenId: 0, hashValue: "0" };
    },
  },
});

export const { selectNFT, setNFTInfo, clearNFTList, clearNFTInfo } =
  submitSelectedOrganizationNFTSlice.actions;

export default submitSelectedOrganizationNFTSlice.reducer;
