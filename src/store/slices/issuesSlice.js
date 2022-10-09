import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import requestApi from "config/apiHandler";
import { GIT_ISSUE_ENDPOINT } from "config/constants";

export const fetchGitIssues = createAsyncThunk(
  "issues/fetchGitIssues",
  async (requestData, { getState, requestId, rejectWithValue }) => {
    const { currentRequestId, fetching } = getState().issues;
    if (fetching !== true || requestId !== currentRequestId) {
      return null;
    }
    try {
      const response = await requestApi(GIT_ISSUE_ENDPOINT, "GET");
      if (response) {
        return response;
      }
      return rejectWithValue(response.message);
    } catch (err) {
      console.log(err);
      // alert(err);
      throw err;
    }
  }
);

const initialState = {
  currentRequestId: undefined,
  fetching: false,
  error: null,
  issues: [],
};

export const issuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGitIssues.pending, (state, action) => {
        if (state.fetching === false) {
          state.fetching = true;
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(fetchGitIssues.fulfilled, (state, action) => {
        console.log(action);
        const { requestId } = action.meta;
        if (state.fetching === true && state.currentRequestId === requestId) {
          state.fetching = false;
          state.issues = [...current(state.issues), ...action.payload];
          state.currentRequestId = undefined;
        }
      })
      .addCase(fetchGitIssues.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.fetching === true && state.currentRequestId === requestId) {
          // Being that we passed in ValidationErrors to rejectType in `createAsyncThunk`, the payload will be available here. action.payload.errorMessage
          state.error = action.payload ? action.payload : action.error.message;
          state.currentRequestId = undefined;
          state.fetching = false;
        }
      });
  },
});

export default issuesSlice.reducer;
