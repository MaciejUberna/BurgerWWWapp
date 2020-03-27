import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
};

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
};

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    };
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    };
};

export const initIngredints = () => {
    return dispatch => {
        axios.get('https://maciej-my-burger.firebaseio.com/ingredients.json')
        .then(response => {
            console.log('Ingredients feached from database: ',response)
            dispatch(setIngredients(response.data))
        })
        .catch(error => {
            console.log('Ingredients not fetched, error: ',error)
            dispatch(fetchIngredientsFailed())
        });

    };
};