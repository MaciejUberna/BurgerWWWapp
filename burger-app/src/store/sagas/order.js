import axios from '../../axios-orders';

import { put } from 'redux-saga/effects';

import * as actions from '../actions';

export function* purchaseBurgerSaga(action) {
    yield put(actions.purchaseBurgerStart());
    try {
        const response = yield axios.post('/orders.json?auth=' + action.authToken,action.orderData);
        yield put(actions.purchaseBurgerSuccess(response.data.name,action.orderData));
    } catch(error) {
        yield put(actions.purchaseBurgerFail(error));
    };
};

export function* deleteOrderSaga(action){
    yield put(actions.deleteOrderStart());
    try {
        yield axios.delete('/orders/'+action.id+'.json?auth='+action.authToken);
        //console.log('Response: ',response)
        yield put(actions.deleteOrderSuccess(action.id));
    } catch (error){
        yield put(actions.deleteOrderFail(error));
    };
};

export function* fetchOrdersSaga(action) {
    yield put(actions.fetchOrdersStart());
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