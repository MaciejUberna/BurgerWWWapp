import { put } from 'redux-saga/effects';

//import * as actions from '../actions/index';
import * as actionTypes from '../actions/actionTypes';

export function* logoutSaga() {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');
    yield put({
        type: actionTypes.AUTH_LOGOUT
    });
}