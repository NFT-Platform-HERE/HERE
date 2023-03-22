import { createSlice } from "@reduxjs/toolkit";

interface myNFTState {
  selectedNFTList: number[];
}

const initialState: myNFTState = {
  selectedNFTList: [],
};

const myNFTSlice = createSlice({
  name: "myNFT",
  initialState,
  reducers: {
    addNFT(state, action) {
      state.selectedNFTList.push(action.payload);
    },
    deleteNFT(state, action) {
      state.selectedNFTList = state.selectedNFTList.filter((selectedNFT) => {
        return action.payload !== selectedNFT;
      });
    },
    clearNFTList(state) {
      state.selectedNFTList = [];
    },
  },
});

export const { addNFT, deleteNFT, clearNFTList } = myNFTSlice.actions;

export default myNFTSlice.reducer;
