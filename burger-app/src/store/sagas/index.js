import { takeEvery } from 'redux-saga/effects';

import * as ActionTypes from '../actions/actionTypes';
import { logoutSaga } from './auth';

//This is listener that listens to ActionTypes.AUTH_INITIATE_LOGOUT and executes logoutSaga
export function* watchAuth() {
    yield takeEvery(ActionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
}