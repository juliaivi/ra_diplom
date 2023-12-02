import {
  put, takeEvery, spawn, takeLatest,
} from 'redux-saga/effects';
import {
  getHitList,
  getCategoriesList,
  getItemInfo,
  sendOrder,
  searchItems,
  getLoadMoreItems,
  getAllCatalogItems,
  getNotAllCatalogItems,
} from '../../api/serverRequests';

import { orderRequest, orderSuccess, orderFailure } from '../slice/orderSlice';
import {
  catalogListSuccess,
  catalogListRequest,
  searchSuccess,
  searchItem,
  searchItemsCatalog,
  getMore,
  catalogListFailure,
  catalogListReset,
} from '../slice/catalogListSlice';
import {
  categoriesListFailure,
  categoriesListSuccess,
  categoriesListRequest,
  categoriesChange,
  clearCategories,
} from '../slice/categoriesListSlice';

import { hitListRequest, hitListSuccess, hitListFailure } from '../slice/hitListSlice';

function* handleHitSaga() {
  try {
    const data = yield getHitList();
    yield put(hitListSuccess(data));
  } catch (e) {
    yield put(hitListFailure(e.message));
  }
}

function* watchHitListSaga() {
  yield takeEvery(hitListRequest, handleHitSaga);
}

function* handleCategoriesSaga() {
  try {
    yield put(clearCategories());
    const data = yield getCategoriesList();
    yield put(categoriesListSuccess(data));
  } catch (e) {
    yield put(categoriesListFailure(e.message));
  }
}

function* watchCategoriesListSaga() {
  yield takeLatest(categoriesListRequest, handleCategoriesSaga);
}

function* handleCatalogSaga() {
  try {
    yield put(catalogListReset());
    const data = yield getAllCatalogItems();
    yield put(catalogListSuccess(data));
  } catch (e) {
    yield put(catalogListFailure(e.message));
  }
}

function* watchCatalogSaga() {
  yield takeLatest(catalogListRequest, handleCatalogSaga);
}

function* handleNotAllCatalogItemsSaga(action) {
  try {
    yield put(catalogListReset());
    const data = yield getNotAllCatalogItems(action.payload);
    yield put(catalogListSuccess(data));
  } catch (e) {
    yield put(catalogListFailure(e));
  }
}

function* watchNotAllCatalogItemsSaga() {
  yield takeLatest(categoriesChange, handleNotAllCatalogItemsSaga);
}

function* handleGetMoreItemsSaga(action) {
  try {
    const data = yield getLoadMoreItems(action.payload.categorieActive, action.payload.offset);
    yield put(catalogListSuccess(data));
  } catch (e) {
    yield put(catalogListFailure(e.message));
  }
}

function* watchLoadMoreItemsSaga() {
  yield takeLatest(getMore, handleGetMoreItemsSaga);
}

function* handleSearchItemSaga(action) {
  try {
    const data = yield searchItems(action.payload.payload, action.payload.categorieActive);
    yield put(catalogListSuccess(data));
  } catch (e) {
    yield put(catalogListFailure(e));
  }
}

function* watchSearchItemSaga() {
  yield takeLatest(searchItemsCatalog, handleSearchItemSaga);
}

function* handleGetItemInfoSaga(action) {
  try {
    const data = yield getItemInfo(action.payload);
    yield put(searchSuccess(data));
  } catch (e) {
    yield put(catalogListFailure(e.message));
  }
}

function* watchGetItemInfoSaga() {
  yield takeLatest(searchItem, handleGetItemInfoSaga);
}

function* handleSendOrderSaga(action) {
  try {
    const data = yield sendOrder(action.payload);
    yield put(orderSuccess(data));
  } catch (e) {
    yield put(orderFailure(e.message));
  }
}

function* watchSendOrderSaga() {
  yield takeLatest(orderRequest, handleSendOrderSaga);
}

export default function* saga() {
  yield spawn(watchHitListSaga);
  yield spawn(watchCategoriesListSaga);
  yield spawn(watchCatalogSaga);
  yield spawn(watchNotAllCatalogItemsSaga);
  yield spawn(watchLoadMoreItemsSaga);
  yield spawn(watchSearchItemSaga);
  yield spawn(watchGetItemInfoSaga);
  yield spawn(watchSendOrderSaga);
}
