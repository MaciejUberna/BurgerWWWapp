import axios from 'axios';

import { delay } from 'redux-saga/effects';
import { put } from 'redux-saga/effects';

import * as actions from '../actions/index';

export function* logoutSaga() {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');
    yield put(actions.logoutSucceed());
};

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000);
    yield put(actions.logout())
};

export function* authUserSaga(action) {
    yield put(actions.authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    };
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDn9qfJw4afsx2zmoMUKS4cpia4WSXroeo'
    if(!action.isSignUp)
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDn9qfJw4afsx2zmoMUKS4cpia4WSXroeo';
    try {
        const response = yield axios.post(url,authData); 
        const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
        yield localStorage.setItem('token',response.data.idToken);
        yield localStorage.setItem('expirationDate',expirationDate);
        yield localStorage.setItem('userId',response.data.localId)
        yield put(actions.authSuccess(response.data.idToken,response.data.localId));
        yield put(actions.checkAuthTimeout(response.data.expiresIn));
    } catch(error) {
        //yield console.log('Firebase or auth error: ',error.message);
        yield put(actions.authFail(error.message));
    };
};