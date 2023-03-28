import { createSlice } from "@reduxjs/toolkit";

interface selectedHospitalNFTState {
  selectedHospitalNFTList: number[];
}

const initialState: selectedHospitalNFTState = {
  selectedHospitalNFTList: [0],
};

const submitSelectedHospitalNFTSlice = createSlice({
  name: "submitSelectedHospitalNFT",
  initialState,
  reducers: {
    addNFT(state, action) {
      state.selectedHospitalNFTList.push(action.payload);
    },
    deleteNFT(state, action) {
      state.selectedHospitalNFTList = state.selectedHospitalNFTList.filter(
        (selectedNFT) => {
          return action.payload !== selectedNFT;
        },
      );
    },
    clearNFTList(state) {
      state.selectedHospitalNFTList = [];
    },
  },
});

export const { addNFT, deleteNFT, clearNFTList } =
  submitSelectedHospitalNFTSlice.actions;

export default submitSelectedHospitalNFTSlice.reducer;
