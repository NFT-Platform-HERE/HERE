import { createSlice } from "@reduxjs/toolkit";

interface selectedOrganizationNFTState {
  selectedOrganizationNFT: number;
  selectedOrganizationTokenId: number;
}

const initialState: selectedOrganizationNFTState = {
  selectedOrganizationNFT: 0,
  selectedOrganizationTokenId: 0,
};

const submitSelectedOrganizationNFTSlice = createSlice({
  name: "submitSelectedOrganizationNFT",
  initialState,
  reducers: {
    selectNFT(state, action) {
      state.selectedOrganizationNFT = action.payload;
    },
    setTokenId(state, action) {
      state.selectedOrganizationTokenId = action.payload;
    },
    clearNFTList(state) {
      state.selectedOrganizationNFT = 0;
    },
  },
});

export const { selectNFT, setTokenId, clearNFTList } =
  submitSelectedOrganizationNFTSlice.actions;

export default submitSelectedOrganizationNFTSlice.reducer;
