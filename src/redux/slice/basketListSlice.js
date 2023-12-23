import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

export const basketListSlice = createSlice({
  name: "basketList",
  initialState,
  reducers: {
    basketProducts: (state, action) => {
      state.products = action.payload;
    },
    clearbasketProducts: (state) => {
      state.products = [];
    },
  },
});

export const { basketProducts, clearbasketProducts } = basketListSlice.actions;
export default basketListSlice.reducer;
