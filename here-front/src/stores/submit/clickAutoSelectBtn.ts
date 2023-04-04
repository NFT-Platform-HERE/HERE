import { createSlice } from "@reduxjs/toolkit";

interface clickAutoSelectBtnState {
  onClick: boolean;
  isModalOpen: boolean;
}

const initialState: clickAutoSelectBtnState = {
  onClick: false,
  isModalOpen: false,
};

const clickAutoSelectBtnSlice = createSlice({
  name: "clickAutoSelectBtn",
  initialState,
  reducers: {
    onClickAutoSelectBtn(state) {
      state.onClick = !state.onClick;
    },
    setModalOpen(state) {
      state.isModalOpen = true;
    },
  },
});

export const { onClickAutoSelectBtn } = clickAutoSelectBtnSlice.actions;

export default clickAutoSelectBtnSlice.reducer;
