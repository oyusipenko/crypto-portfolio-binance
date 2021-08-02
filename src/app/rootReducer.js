import { combineReducers } from "@reduxjs/toolkit";

import walletReducer from "../features/wallet/walletSlice";

const rootReducer = combineReducers({
  wallet: walletReducer,
});

export default rootReducer;
