import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import requestApi from "config/apiHandler";
import { GIT_REPO_INFO } from "config/constants";

export const fetchRepoInfo = createAsyncThunk(
  "repo/fetchRepoInfo",
  async (requestData, { getState, requestId, rejectWithValue }) => {
    const { currentRequestId, fetching } = getState().repo;
    if (fetching !== true || requestId !== currentRequestId) {
      return null;
    }
    try {
      const response = await requestApi(GIT_REPO_INFO, "GET");
      if (response) {
        return response;
      }
      return rejectWithValue(response.message);
    } catch (err) {
      alert(err);
      throw err;
    }
  }
);

const initialState = {
  currentRequestId: undefined,
  fetching: false,
  error: null,
  repoInfo: {},
};

export const repoSlice = createSlice({
  name: "repo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepoInfo.pending, (state, action) => {
        if (state.fetching === false) {
          state.fetching = true;
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(fetchRepoInfo.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.fetching === true && state.currentRequestId === requestId) {
          state.fetching = false;
          state.repoInfo = action.payload;
          state.currentRequestId = undefined;
        }
      })
      .addCase(fetchRepoInfo.rejected, (state, action) => {
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

export default repoSlice.reducer;
