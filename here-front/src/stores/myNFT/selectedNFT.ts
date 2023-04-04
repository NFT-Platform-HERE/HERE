import { createSlice } from "@reduxjs/toolkit";

interface myNFTState {
  selectedNFT: number;
  tokenId: number;
}

const initialState: myNFTState = {
  selectedNFT: -1,
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
    closeModal(state) {
      state.selectedNFT = -1;
    },
  },
});

export const { selectNFT, setTokenId, closeModal } = selectedNFTSlice.actions;

export default selectedNFTSlice.reducer;
