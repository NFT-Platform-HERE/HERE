import { createSlice } from "@reduxjs/toolkit";

interface selectedHospitalNFTState {
  selectedHospitalNFTList: number[];
  selectedHospitalNFTInfoList: { tokenId: number; hashValue: string }[];
}

const initialState: selectedHospitalNFTState = {
  selectedHospitalNFTList: [],
  selectedHospitalNFTInfoList: [],
};

const submitSelectedHospitalNFTSlice = createSlice({
  name: "submitSelectedHospitalNFT",
  initialState,
  reducers: {
    addNFT(state, action) {
      state.selectedHospitalNFTList.push(action.payload);
    },
    addNFTInfo(state, action) {
      state.selectedHospitalNFTInfoList.push(action.payload);
    },
    deleteNFT(state, action) {
      state.selectedHospitalNFTList = state.selectedHospitalNFTList.filter(
        (selectedNFT) => {
          return action.payload !== selectedNFT;
        },
      );
    },
    deleteNFTInfo(state, action) {
      state.selectedHospitalNFTInfoList =
        state.selectedHospitalNFTInfoList.filter(({ tokenId }) => {
          return action.payload !== tokenId;
        });
    },

    clearNFTList(state) {
      state.selectedHospitalNFTList = [];
    },

    clearNFTInfoList(state) {
      state.selectedHospitalNFTInfoList = [];
    },
  },
});

export const {
  addNFT,
  addNFTInfo,
  deleteNFT,
  deleteNFTInfo,
  clearNFTList,
  clearNFTInfoList,
} = submitSelectedHospitalNFTSlice.actions;

export default submitSelectedHospitalNFTSlice.reducer;
