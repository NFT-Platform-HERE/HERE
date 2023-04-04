import { createSlice } from "@reduxjs/toolkit";

interface saveImgState {
  isLoading: boolean;
}

const initialState: saveImgState = {
  isLoading: false,
};

const saveImgSlice = createSlice({
  name: "saveImg",
  initialState,
  reducers: {
    endSaveImg(state) {
      state.isLoading = false;
    },
    loading(state) {
      state.isLoading = true;
    },
  },
});

export const { endSaveImg, loading } = saveImgSlice.actions;

export default saveImgSlice.reducer;
