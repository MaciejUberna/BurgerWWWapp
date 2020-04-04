import * as ActionTypes from './actionTypes';
import axios from 'axios';

const authStart = () => {
    return {
        type: ActionTypes.AUTH_START
    };
};

const authSuccess = (idToken, localId) => {
    return {
        type: ActionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: localId
    };
};

const authFail = (error) => {
    return {
        type: ActionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    return {
        type: ActionTypes.AUTH_LOGOUT
    };
};

const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        },expirationTime * 1000);
    };
};

export const auth = (email, password,isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDn9qfJw4afsx2zmoMUKS4cpia4WSXroeo'
        if(!isSignUp)
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDn9qfJw4afsx2zmoMUKS4cpia4WSXroeo';
        axios.post(url,authData)
            .then(response =>{
                console.log('Firebase response success: ',response);
                dispatch(authSuccess(response.data.idToken,response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                console.log('Firebase api auth error: ',err.message);
                dispatch(authFail(err));
            });
    };
};

