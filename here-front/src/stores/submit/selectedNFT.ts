import { createSlice } from "@reduxjs/toolkit";

interface selectedNFTState {
  selectedNFT: number[];
}

const initialState: selectedNFTState = {
  selectedNFT: [0, 1, 2, 3, 4],
};

const submitSelectedNFTSlice = createSlice({
  name: "submitSelectedNFT",
  initialState,
  reducers: {
    selectNFT(state, action) {
      state.selectedNFT = action.payload;
    },
  },
});

export const { selectNFT } = submitSelectedNFTSlice.actions;

export default submitSelectedNFTSlice.reducer;
