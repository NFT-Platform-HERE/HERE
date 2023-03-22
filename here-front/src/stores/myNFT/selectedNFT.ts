import { createSlice } from "@reduxjs/toolkit";

interface myNFTState {
  selectedNFT: number;
}

const initialState: myNFTState = {
  selectedNFT: 0,
};

const selectedNFTSlice = createSlice({
  name: "selectedNFT",
  initialState,
  reducers: {
    selectNFT(state, action) {
      state.selectedNFT = action.payload;
    },
  },
});

export const { selectNFT } = selectedNFTSlice.actions;

export default selectedNFTSlice.reducer;
