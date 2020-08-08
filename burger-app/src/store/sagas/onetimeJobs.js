import { put, call } from 'redux-saga/effects';
import * as actions from '../actions/index';

export function* getDisclaimerSaga() {
    const flag = yield call([localStorage,'getItem'],'responseToDisclaimer');
    if (!flag) {
        yield call([localStorage,'setItem'],'responseToDisclaimer', true);
        yield put(actions.disclaimerResponded(true));
    };
};