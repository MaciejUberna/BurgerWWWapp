import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    };
};

const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
};

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth=' + token,orderData)
        .then(response => {
            //console.log('Response data: ',response.data);
            dispatch(purchaseBurgerSuccess(response.data.name,orderData));
        })
        .catch(error => {
            //console.log('Response to order error: ',error);
            dispatch(purchaseBurgerFail(error));
        });
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};

const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    };
};

const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    };
};

export const fetchOrders = (authToken, userId) => {
    return dispatch => {
        dispatch(fetchOrderStart());
        const queryParams = '?auth=' + authToken + '&orderBy="userId"&equalTo="' + userId +'"';
        axios.get('/orders.json' + queryParams)
            .then(res => {
                const orders = [];
                for(let key in res.data) {
                    orders.unshift({
                        ...res.data[key],
                        id: key
                    });
                }
                //console.log('order.js] fetchOrders, response: ',res);
                dispatch(fetchOrdersSuccess(orders))
            })
            .catch(err => {
                //console.log('order.js fetchOrders, error: ',err);
                dispatch(fetchOrdersFail(err));
            })
    };
};