/* eslint-disable import/no-named-as-default */
import { configureStore } from "@reduxjs/toolkit";
import repoSlice from "store/slices/repoSlice";

export const store = configureStore({
  reducer: {
    repo: repoSlice,
  },
});

export default store;
