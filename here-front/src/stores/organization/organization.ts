import { HashValueList } from "@/types/HashValueList";
import { createSlice } from "@reduxjs/toolkit";

interface organizationState {
  tokenId: number;
  hash: string;
  hashValueList: HashValueList[];
}

const initialState: organizationState = {
  tokenId: 0,
  hash: "",
  hashValueList: [],
};

const organizationSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {
    getAgencyNft(state, action) {
      state.tokenId = action.payload.tokenId;
      state.hash = action.payload.hashValue;
    },
    getHospitalNft(state, action) {
      state.hashValueList = action.payload;
    },
  },
});

export const { getAgencyNft, getHospitalNft } = organizationSlice.actions;

export default organizationSlice.reducer;
