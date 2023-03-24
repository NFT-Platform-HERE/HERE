import { createSlice } from "@reduxjs/toolkit";

interface memberState {
  walletAddress: string;
  memberId: string;
  nickname: string;
  characterImgUrl: string;
}

const initialState: memberState = {
  walletAddress: "",
  memberId: "",
  nickname: "",
  characterImgUrl: "",
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
    },
    deleteMemberInfo(state) {
      state.memberId = "";
      state.nickname = "";
      state.characterImgUrl = "";
    },
  },
});

export const { getWalletAddress, getMemberInfo, deleteMemberInfo } =
  memberSlice.actions;

export default memberSlice.reducer;
