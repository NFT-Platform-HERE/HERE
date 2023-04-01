import { createSlice } from "@reduxjs/toolkit";

interface memberState {
  walletAddress: string;
  memberId: string;
  nickname: string;
  characterImgUrl: string;
  organizationId: string;
  isHospital: boolean;
}

const initialState: memberState = {
  walletAddress: "",
  memberId: "",
  nickname: "",
  characterImgUrl: "",
  organizationId: "",
  isHospital: false,
};

const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    getWalletAddress(state, action) {
      state.walletAddress = action.payload;
    },
    getMemberInfo(state, action) {
      state.memberId = action.payload.memberId;
      state.nickname = action.payload.nickname;
      state.characterImgUrl = action.payload.characterImgUrl;
      state.isHospital = false;
    },
    deleteMemberInfo(state) {
      state.memberId = "";
      state.nickname = "";
      state.characterImgUrl = "";
    },
    getAgencyId(state, action) {
      state.organizationId = action.payload.memberId;
      state.isHospital = false;
    },
    getHospitalId(state, action) {
      state.organizationId = action.payload.memberId;
      state.isHospital = true;
    },
  },
});

export const {
  getWalletAddress,
  getMemberInfo,
  deleteMemberInfo,
  getAgencyId,
  getHospitalId,
} = memberSlice.actions;

export default memberSlice.reducer;
