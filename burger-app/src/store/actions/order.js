import * as actionTypes from './actionTypes';

export const deleteOrder = (authToken, id) => {
    return {
        type: actionTypes.DELETE_ORDER,
        id: id,
        authToken: authToken
    };
};

export const deleteOrderStart = () => {
    return {
        type: actionTypes.DELETE_ORDER_START
    };
};

export const deleteOrderSuccess = (id) => {
    return {
        type: actionTypes.DELETE_ORDER_SUCCESS,
        id: id,
    };
};

export const deleteOrderFail = (error) => {
    return {
        type: actionTypes.DELETE_ORDER_FAIL,
        error: error
    };
};

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
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

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
};

export const purchaseBurger = (orderData, authToken) => {
    return {
        type: actionTypes.PURCHASE_BURGER,
        orderData: orderData,
        authToken: authToken
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    };
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    };
};

export const fetchOrders = (authToken, userId) => {
    return {
        type: actionTypes.FETCH_ORDERS,
        authToken: authToken,
        userId: userId
    };
};