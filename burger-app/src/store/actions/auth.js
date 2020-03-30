import * as ActionTypes from './actionTypes';

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

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
    };
};

