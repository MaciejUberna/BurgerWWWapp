import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga } from './auth';
import { initIngredintsSaga } from './burgerBuilder';
import { purchaseBurgerSaga, fetchOrdersSaga } from './order'

//This is listener that listens to ActionTypes.AUTH_INITIATE_LOGOUT and executes logoutSaga
export function* watchAuth() {
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
    yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga);
};

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.INIT_INGREDIENTS,initIngredintsSaga);
};

export function* watchOrder() {
    yield takeEvery(actionTypes.PURCHASE_BURGER,purchaseBurgerSaga);
    yield takeEvery(actionTypes.FETCH_ORDERS,fetchOrdersSaga);
};