import { createSlice } from "@reduxjs/toolkit";

interface selectedNFTState {
  selectedNFTList: number[];
}

const initialState: selectedNFTState = {
  selectedNFTList: [0],
};

const submitSelectedNFTSlice = createSlice({
  name: "submitSelectedNFT",
  initialState,
  reducers: {
    addNFT(state, action) {
      state.selectedNFTList.push(action.payload);
    },
    clearNFTList(state) {
      state.selectedNFTList = [];
    },
  },
});

export const { addNFT, clearNFTList } = submitSelectedNFTSlice.actions;

export default submitSelectedNFTSlice.reducer;
