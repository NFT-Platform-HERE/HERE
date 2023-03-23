import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import mobileHeaderMenuDropdownSlice from "./header/mobileHeaderMenuDropdown";
import mobileHeaderNameSlice from "./header/mobileHeaderName";
import mobileHeaderProfileDropdownSlice from "./header/mobileHeaderProfileDropdown";
import myNFTSlice from "./myNFT/myNFT";
import selectedNFTSlice from "./myNFT/selectedNFT";
import memberSlice from "./member/member";

const reducers = combineReducers({
  myNFT: myNFTSlice,
  selectedNFT: selectedNFTSlice,
  member: memberSlice,
  mobileHeaderMenuDropdown: mobileHeaderMenuDropdownSlice,
  mobileHeaderProfileDropdown: mobileHeaderProfileDropdownSlice,
  mobileHeaderName: mobileHeaderNameSlice,
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
