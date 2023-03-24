import { createSlice } from "@reduxjs/toolkit";

interface memberState {
  walletAddress: string;
}

const initialState: memberState = {
  walletAddress: "",
};

const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    getWalletAddress(state, action) {
      state.walletAddress = action.payload;
      console.log(state.walletAddress, "지갑주소");
    },
  },
});

export const { getWalletAddress } = memberSlice.actions;

export default memberSlice.reducer;
