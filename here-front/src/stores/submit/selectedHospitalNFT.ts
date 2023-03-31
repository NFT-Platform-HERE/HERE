import { createSlice } from "@reduxjs/toolkit";

interface selectedHospitalNFTState {
  selectedHospitalNFTList: number[];
  selectedHospitalNFTTokenIdList: number[];
}

const initialState: selectedHospitalNFTState = {
  selectedHospitalNFTList: [],
  selectedHospitalNFTTokenIdList: [],
};

const submitSelectedHospitalNFTSlice = createSlice({
  name: "submitSelectedHospitalNFT",
  initialState,
  reducers: {
    addNFT(state, action) {
      state.selectedHospitalNFTList.push(action.payload);
    },
    addTokenId(state, action) {
      state.selectedHospitalNFTTokenIdList.push(action.payload);
    },
    deleteNFT(state, action) {
      state.selectedHospitalNFTList = state.selectedHospitalNFTList.filter(
        (selectedNFT) => {
          return action.payload !== selectedNFT;
        },
      );
    },
    deleteTokenId(state, action) {
      state.selectedHospitalNFTTokenIdList =
        state.selectedHospitalNFTTokenIdList.filter((selectedTokenId) => {
          return action.payload !== selectedTokenId;
        });
    },

    clearNFTList(state) {
      state.selectedHospitalNFTList = [];
    },

    clearTokenIdList(state) {
      state.selectedHospitalNFTTokenIdList = [];
    },
  },
});

export const {
  addNFT,
  addTokenId,
  deleteNFT,
  deleteTokenId,
  clearNFTList,
  clearTokenIdList,
} = submitSelectedHospitalNFTSlice.actions;

export default submitSelectedHospitalNFTSlice.reducer;
