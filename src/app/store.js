import { configureStore } from "@reduxjs/toolkit";
import mainTableReducer from "../features/MainTable/MainTableSlice";

export const store = configureStore({
  reducer: {
    mainTable: mainTableReducer,
  },
});
