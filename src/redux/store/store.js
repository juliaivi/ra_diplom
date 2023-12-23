import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import saga from "../sagas";

import hitListReducer from "../slice/hitListSlice";
import catalogListReducer from "../slice/catalogListSlice";
import categoriesListReducer from "../slice/categoriesListSlice";
import orderReduser from "../slice/orderSlice";
import basketListReduser from "../slice/basketListSlice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    hitList: hitListReducer,
    catalogList: catalogListReducer,
    categoriesList: categoriesListReducer,
    order: orderReduser,
    basketList: basketListReduser,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});

sagaMiddleware.run(saga);
