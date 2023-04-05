import { createSlice } from "@reduxjs/toolkit";

interface alarmState {
  senderId: string;
  nftHistoryList: string[];
  isOpen: boolean;
  alarmCode: string;
}

const initialState: alarmState = {
  senderId: "",
  nftHistoryList: [],
  isOpen: false,
  alarmCode: "",
};

const alarmSlice = createSlice({
  name: "alarm",
  initialState,
  reducers: {
    setSenderId(state, action) {
      state.senderId = action.payload;
    },
    setNFTHistoryList(state, action) {
      state.nftHistoryList = action.payload;
    },
    setAlarmCode(state, action) {
      state.alarmCode = action.payload;
    },
    setOpen(state) {
      state.isOpen = true;
    },
    setClose(state) {
      state.isOpen = false;
    },
  },
});

export const {
  setSenderId,
  setNFTHistoryList,
  setAlarmCode,
  setOpen,
  setClose,
} = alarmSlice.actions;

export default alarmSlice.reducer;
