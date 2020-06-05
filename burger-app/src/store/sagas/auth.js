import axios from 'axios';

import { delay, put, call } from 'redux-saga/effects';

import * as actions from '../actions/index';

export function* logoutSaga() {
    //call is better for testing (test generators) since I can easylly mock this.
    yield call([localStorage,'removeItem'], "token");
    yield call([localStorage,'removeItem'], "expirationDate");
    yield call([localStorage,'removeItem'], "userId");
    yield call([localStorage,'removeItem'], "login");
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
        yield call([localStorage,'setItem'],'token', response.data.idToken);
        yield call([localStorage,'setItem'],'expirationDate', expirationDate);
        yield call([localStorage,'setItem'],'userId', response.data.localId);
        yield call([localStorage,'setItem'],'login', action.email);
        yield put(actions.authSuccess(response.data.idToken,response.data.localId,action.email));
        yield put(actions.checkAuthTimeout(response.data.expiresIn));
    } catch(error) {
        //yield console.log('Firebase or auth error: ',error.message);
        yield put(actions.authFail(error));
    };
};

export function* authCheckStateSaga() {
    const token = yield localStorage.getItem('token');
    if(!token) {
        yield put(actions.logout());
    } else {
        const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
        if(expirationDate <= new Date()) {
            yield put(actions.logout());
        } else {
            const userId = yield localStorage.getItem('userId');
            yield put(actions.authSuccess(token,userId,localStorage.getItem('login')));
            yield put(actions.checkAuthTimeout( (expirationDate.getTime() - new Date().getTime())/ 1000 ))
        };
    };
};