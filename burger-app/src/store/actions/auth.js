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
    // localStorage.removeItem('token');
    // localStorage.removeItem('expirationDate');
    // localStorage.removeItem('userId');
    return {
        type: ActionTypes.AUTH_INITIATE_LOGOUT
    };
};

export const logoutSucceed = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
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
                //console.log('Firebase response success: ',response);

                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);

                localStorage.setItem('token',response.data.idToken);
                localStorage.setItem('expirationDate',expirationDate);
                localStorage.setItem('userId',response.data.localId)


                dispatch(authSuccess(response.data.idToken,response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                console.log('Firebase api auth error: ',err.message);
                dispatch(authFail(err));
            });
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: ActionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token,userId));
                dispatch(checkAuthTimeout( (expirationDate.getTime() - new Date().getTime())/ 1000 ))
            };

        }
    };
};

