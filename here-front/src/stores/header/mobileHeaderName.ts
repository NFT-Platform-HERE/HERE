import { createSlice } from "@reduxjs/toolkit";

interface mobileHeaderNameState {
  name: string;
}

const initialState: mobileHeaderNameState = {
  name: "home",
};

const mobileHeaderNameSlice = createSlice({
  name: "mobileHeaderName",
  initialState,
  reducers: {
    setMobileHeaderName(state, action) {
      state.name = action.payload;
    },
  },
});

export const { setMobileHeaderName } = mobileHeaderNameSlice.actions;

export default mobileHeaderNameSlice.reducer;
