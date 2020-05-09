import { put } from 'redux-saga/effects';

import * as ActionTypes from '../actions/actionTypes';

export function* logoutSaga( action ) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');
    yield put({
        type: ActionTypes.AUTH_LOGOUT
    });
}