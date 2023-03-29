import { createSlice } from "@reduxjs/toolkit";

interface clickAutoSelectBtnState {
  onClick: boolean;
}

const initialState: clickAutoSelectBtnState = {
  onClick: false,
};

const clickAutoSelectBtnSlice = createSlice({
  name: "clickAutoSelectBtn",
  initialState,
  reducers: {
    onClickAutoSelectBtn(state) {
      state.onClick = !state.onClick;
    },
  },
});

export const { onClickAutoSelectBtn } = clickAutoSelectBtnSlice.actions;

export default clickAutoSelectBtnSlice.reducer;
