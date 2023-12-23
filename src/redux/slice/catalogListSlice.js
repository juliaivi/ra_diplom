import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  itemCatalog: [],
  loadingCatalog: true,
  errorCatalog: false,
  categorieActive: 0,
  itemLength: null,
  offset: 0,
  search: "",
  item: null,
  id: null,
};

export const catalogListSlice = createSlice({
  name: "catalogList",
  initialState,
  reducers: {
    catalogListRequest: (state) => {
      state.loadingCatalog = true;
      state.errorCatalog = false;
    },
    catalogListSuccess: (state, action) => {
      state.loadingCatalog = false;
      state.errorCatalog = false;
      state.itemCatalog = [...state.itemCatalog.concat(action.payload)];
      state.itemLength = action.payload.length;
    },
    catalogListReset: (state) => {
      state.itemCatalog = [];
      state.loadingCatalog = false;
      state.errorCatalog = false;
    },
    catalogListFailure: (state, action) => {
      state.loadingCatalog = false;
      state.errorCatalog = action.payload;
    },
    getMore: (state, action) => {
      state.loadingCatalog = true;
      const { categorieActive, offset } = action.payload;
      state.categorieActive = categorieActive;
      state.offset = offset;
    },
    searchItemsCatalog: (state, action) => {
      const { payload, categorieActive } = action.payload;
      state.itemCatalog = [];
      state.search = payload;
      state.categorieActive = categorieActive;
    },
    searchItem: (state, action) => {
      state.id = action.payload;
      state.loadingCatalog = true;
      state.errorCatalog = false;
    },
    searchSuccess: (state, action) => {
      state.item = action.payload;
      state.loadingCatalog = false;
      state.errorCatalog = false;
    },
  },
});

export const {
  catalogListSuccess,
  catalogListRequest,
  searchSuccess,
  searchItem,
  searchItemsCatalog,
  getMore,
  catalogListFailure,
  catalogListReset,
} = catalogListSlice.actions;
export default catalogListSlice.reducer;
