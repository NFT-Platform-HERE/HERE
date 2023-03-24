import { createSlice } from "@reduxjs/toolkit";

interface submitTabState {
  tabIndex: 1 | 2;
}

const initialState: submitTabState = {
  tabIndex: 1,
};

const submitTabSlice = createSlice({
  name: "submitTabIndex",
  initialState,
  reducers: {
    setTabOrganization(state) {
      state.tabIndex = 1;
    },
    setTabHospital(state) {
      state.tabIndex = 2;
    },
  },
});

export const { setTabOrganization, setTabHospital } = submitTabSlice.actions;

export default submitTabSlice.reducer;
