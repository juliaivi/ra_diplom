import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  itemCategories: [{ id: 0, title: 'Все' }],
  categorieActive: 0,
  loadingCategories: true,
  errorCategories: false,
};

export const categoriesListSlice = createSlice({
  name: 'categoriesList',
  initialState,
  reducers: {
    categoriesListRequest: (state) => {
      state.categorieActive = 0;
      state.loadingCategories = true;
      state.errorCategories = false;
    },
    categoriesListSuccess: (state, action) => {
      state.categorieActive = 0;
      state.itemCategories = [...state.itemCategories.concat(action.payload)];
      state.loadingCategories = false;
      state.errorCategories = false;
    },
    categoriesListFailure: (state, action) => {
      state.categorieActive = 0;
      state.loadingCategories = false;
      state.errorCategories = action.payload;
    },
    categoriesChange: (state, action) => {
      state.categorieActive = action.payload;
    },
    clearCategories: (state) => {
      state.itemCategories = [{ id: 0, title: 'Все' }];
      state.loadingCategories = false;
      state.errorCategories = false;
    },
  },
});

export const {
  categoriesListFailure,
  categoriesListSuccess,
  categoriesListRequest,
  categoriesChange,
  clearCategories,
} = categoriesListSlice.actions;
export default categoriesListSlice.reducer;
