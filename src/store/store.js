import { configureStore } from "@reduxjs/toolkit";
import repoSlice from "store/slices/repoSlice";
import issuesSlice from "store/slices/issuesSlice";

export const store = configureStore({
  reducer: {
    repo: repoSlice,
    issues: issuesSlice,
  },
});

export default store;
