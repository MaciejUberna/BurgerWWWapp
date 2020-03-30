import * as ActionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: ActionTypes.AUTH_START
    };
};

export const authSuccess = (authData) => {
    return {
        type: ActionTypes.AUTH_SUCCESS,
        authData: authData
    };
};

export const authFail = (error) => {
    return {
        type: ActionTypes.AUTH_FAIL,
        error: error
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
                dispatch(authSuccess(response.data));
            })
            .catch(err => {
                console.log('Firebase api auth error: ',err);
                dispatch(authFail(err));
            });
    };
};

