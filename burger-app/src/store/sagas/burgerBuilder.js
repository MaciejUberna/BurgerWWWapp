import axios from '../../axios-orders';

import { put } from 'redux-saga/effects';

import * as actions from '../actions';

export function* initIngredintsSaga() {
    try {
        const response = yield axios.get('https://maciej-my-burger.firebaseio.com/ingredients.json');
        yield put(actions.setIngredients(response.data))
    } catch(error) {
        yield console.log('Error initIngredientSaga: ',error);
        yield put(actions.fetchIngredientsFailed())
    };
}