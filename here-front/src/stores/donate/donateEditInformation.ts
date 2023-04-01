import { createSlice } from "@reduxjs/toolkit";

interface donateEditInfo {
  boardId: number;
  boardImgUrlList: string[];
  content: string;
  goalQuantity: number;
  title: string;
  memberId: string;
  deadline: string;
}

const initialState: donateEditInfo = {
  title: "",
  boardId: 0,
  boardImgUrlList: [],
  content: "",
  goalQuantity: 0,
  memberId: "",
  deadline: "",
};

const donateSlice = createSlice({
  name: "donate",
  initialState,
  reducers: {
    setBoardEditInfo(state, action) {
      state.boardId = action.payload.boardId;
      state.boardImgUrlList = action.payload.boardImgUrlList;
      state.content = action.payload.content;
      state.goalQuantity = action.payload.goalQuantity;
      state.title = action.payload.title;
      state.memberId = action.payload.memberId;
      state.deadline = action.payload.deadline;
    },
    clearBoardEditInfo(state) {
      state.title = "";
      state.boardId = 0;
      state.boardImgUrlList = [];
      state.content = "";
      state.goalQuantity = 0;
      state.memberId = "";
      state.deadline = "";
    },
  },
});

export const { setBoardEditInfo, clearBoardEditInfo } = donateSlice.actions;

export default donateSlice.reducer;
