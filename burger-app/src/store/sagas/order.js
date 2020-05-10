import axios from '../../axios-orders';

import { put } from 'redux-saga/effects';

import * as actions from '../actions';

export function* purchaseBurgerSaga(action) {
    yield put(actions.purchaseBurgerStart());
    try {
        const response = yield axios.post('/orders.json?auth=' + action.token,action.orderData)
        yield put(actions.purchaseBurgerSuccess(response.data.name,action.orderData));
    } catch(error) {
        yield put(actions.purchaseBurgerFail(error));
    };
};

export function* fetchOrdersSaga(action) {
    yield put(actions.fetchOrderStart());
    const queryParams = yield '?auth=' + action.authToken + '&orderBy="userId"&equalTo="' + action.userId +'"';
    try {
        const response = yield axios.get('/orders.json' + queryParams);
        const orders = yield [];
        for(let key in response.data) {
            yield orders.unshift({
                ...response.data[key],
                id: key
            });
        }
        yield put(actions.fetchOrdersSuccess(orders))
    } catch(error) {
        yield put(actions.fetchOrdersFail(error));
    };
};