import * as actionTypes from '../actions/actionTypes';

const checkIfOnLocalStorage = () => {
    if (localStorage.getItem('responseToDisclaimer'))
        return true;
    else
        return false;
};

const initialState = {
    responseToDisclaimer: checkIfOnLocalStorage()
};

const disclaimerFilled = (state, action) => {
    return {
        ...state,
        responseToDisclaimer: action.responseToDisclaimer
    };
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ONETIME_JOBS_DISCLAIMER_FILLED: return disclaimerFilled(state, action);
        default: return state;
    };
};

export default reducer; 