import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import mobileHeaderMenuDropdownSlice from "./header/mobileHeaderMenuDropdown";
import mobileHeaderNameSlice from "./header/mobileHeaderName";
import mobileHeaderProfileDropdownSlice from "./header/mobileHeaderProfileDropdown";
import webHeaderDropdownSlice from "./header/webHeaderDropdown";
import myNFTSlice from "./myNFT/myNFT";
import selectedNFTSlice from "./myNFT/selectedNFT";
import memberSlice from "./member/member";
import organizationSlice from "./organization/organization";
import submitTabSlice from "./submit/submitTab";
import submitSelectedHospitalNFTSlice from "./submit/selectedHospitalNFT";
import submitSelectedOrganizationNFTSlice from "./submit/selectedOrganizationNFT";
import clickAutoSelectBtnSlice from "./submit/clickAutoSelectBtn";
import saveImgSlice from "./myNFT/saveImg";

const reducers = combineReducers({
  myNFT: myNFTSlice,
  selectedNFT: selectedNFTSlice,
  member: memberSlice,
  mobileHeaderMenuDropdown: mobileHeaderMenuDropdownSlice,
  mobileHeaderProfileDropdown: mobileHeaderProfileDropdownSlice,
  mobileHeaderName: mobileHeaderNameSlice,
  submitTab: submitTabSlice,
  submitSelectedHospitalNFT: submitSelectedHospitalNFTSlice,
  submitSelectedOrganizationNFT: submitSelectedOrganizationNFTSlice,
  webHeaderDropdown: webHeaderDropdownSlice,
  clickAutoSelectBtn: clickAutoSelectBtnSlice,
  organization: organizationSlice,
  saveImg: saveImgSlice,
});

const persistConfig = {
  timeout: 100,
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
