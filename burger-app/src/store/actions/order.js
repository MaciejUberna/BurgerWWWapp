import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: ationTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    };
};

export const purchaseBurgerStart = (orderData) => {
    return dispatch => {
        axios.post('/orders.json',orderData)
        .then(response => {
            console.log('Response data: ',response.data);
            dispatch(purchaseBurgerSuccess(response.data,orderData));
        })
        .catch(error => {
            console.log('Response to order error: ',error);
            dispatch(purchaseBurgerFail(error));
        });
    };
};