import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  order: '',
  success: null,
  loading: false,
  error: false,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    orderRequest: (state, action) => {
      state.info = action.payload;
      state.loading = true;
      state.error = false;
    },
    orderSuccess: (state, action) => {
      state.success = action.payload;
      state.loading = false;
      state.error = false;
    },
    orderFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    orderclear: (state) => {
      state.order = '';
      state.success = null;
      state.loading = false;
      state.error = false;
    },
  },
});

export const {
  orderFailure, orderRequest, orderSuccess, orderclear,
} = orderSlice.actions;
export default orderSlice.reducer;
