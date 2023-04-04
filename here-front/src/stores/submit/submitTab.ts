import { createSlice } from "@reduxjs/toolkit";

interface submitTabState {
  tabName: "AGENCY" | "HOSPITAL";
}

const initialState: submitTabState = {
  tabName: "AGENCY",
};

const submitTabSlice = createSlice({
  name: "submitTabIndex",
  initialState,
  reducers: {
    setTabOrganization(state) {
      state.tabName = "AGENCY";
    },
    setTabHospital(state) {
      state.tabName = "HOSPITAL";
    },
  },
});

export const { setTabOrganization, setTabHospital } = submitTabSlice.actions;

export default submitTabSlice.reducer;
