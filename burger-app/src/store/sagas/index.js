import { takeEvery, all, takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga } from './auth';
import { initIngredintsSaga } from './burgerBuilder';
import { purchaseBurgerSaga, fetchOrdersSaga, deleteOrderSaga } from './order'

//More on redux-saga on page: https://redux-saga.js.org
//Advanced Concepts: https://redux-saga.js.org/docs/advanced/
//API Reference: https://redux-saga.js.org/docs/api/

//Pros & Cons for Redux Saga vs Thunks: https://stackoverflow.com/questions/34930735/pros-cons-of-using-redux-saga-with-es6-generators-vs-redux-thunk-with-es2017-asy/34933395

//This is listener that listens to ActionTypes.AUTH_INITIATE_LOGOUT and executes logoutSaga
//takeLatest can be used for the latest execution of thread.
export function* watchAuth() {
    //all runs tasks simultanously
    yield all([
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(actionTypes.AUTH_USER, authUserSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
    ]);
};

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredintsSaga);
};

export function* watchOrder() {
    //takeLatest will automatically cansel any ongoin executions of purchaseBurgerSaga
    //and always execute the latest one.
    yield takeLatest(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
    yield takeEvery(actionTypes.DELETE_ORDER, deleteOrderSaga);
    yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga);
};