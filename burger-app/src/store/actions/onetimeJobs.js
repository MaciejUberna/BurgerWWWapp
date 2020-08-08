import * as actionTypes from './actionTypes';

export const getDisclaimer = (state) => {
    return {
        type: actionTypes.ONETIME_JOBS_DISCLAIMER,
        ...state
    }
}

export const disclaimerResponded = (response) => {
    return {
        type: actionTypes.ONETIME_JOBS_DISCLAIMER_FILLED,
        responseToDisclaimer: response
    }
}