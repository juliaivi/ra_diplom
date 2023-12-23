import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  loading: false,
  error: false,
};

export const hitListSlice = createSlice({
  name: "hitList",
  initialState,
  reducers: {
    hitListRequest: (state) => {
      state.loading = true;
      state.error = false;
    },
    hitListSuccess: (state, action) => {
      state.items = action.payload;
      state.loading = false;
      state.error = false;
    },
    hitListFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { hitListRequest, hitListSuccess, hitListFailure } =
  hitListSlice.actions;
export default hitListSlice.reducer;
