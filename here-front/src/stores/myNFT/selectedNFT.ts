import { createSlice } from "@reduxjs/toolkit";

interface myNFTState {
  selectedNFT: number;
  tokenId: number;
}

const initialState: myNFTState = {
  selectedNFT: 0,
  tokenId: 0,
};

const selectedNFTSlice = createSlice({
  name: "selectedNFT",
  initialState,
  reducers: {
    selectNFT(state, action) {
      state.selectedNFT = action.payload;
    },
    setTokenId(state, action) {
      state.tokenId = action.payload;
    },
  },
});

export const { selectNFT, setTokenId } = selectedNFTSlice.actions;

export default selectedNFTSlice.reducer;
