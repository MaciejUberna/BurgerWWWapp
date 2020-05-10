import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { logoutSaga } from './auth';

//This is listener that listens to ActionTypes.AUTH_INITIATE_LOGOUT and executes logoutSaga
export function* watchAuth() {
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
}