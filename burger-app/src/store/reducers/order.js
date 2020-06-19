import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const deleteOrderStart = (state) => {
    return updateObject(state, {loading: true});
};

const deleteOrderSuccess = (state, action) => {
    return updateObject(state,{
        loading: false,
        orders: state.orders.filter(o => o.id !== action.id)
    });
};

const deleteOrderFail = (state) => {
    return updateObject(state, { loading: false });
};

const purcheseInit = (state) => {
    return updateObject(state,{purchased: false});
};

const purchaseBurgerStart = (state) => {
    return updateObject(state,{ loading: true});
};

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData,{
        id: action.orderId
    });
    return updateObject(state,{
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
    });
};

const purchaseBurgerFail = (state) => {
    return updateObject(state, { loading: false });
};

const fetchOrdersSuccess = (state, action) => {
    return updateObject(state,{
        orders: action.orders,
        loading: false
    }); 
};

const fetchOrdersFail = (state) => {
    return updateObject(state,{
        loading: false
    });
};

const fetchOrdersStart = (state) => {
    return updateObject(state,{
        loading: true
    });
};


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.DELETE_ORDER_START: return deleteOrderStart(state);
        case actionTypes.DELETE_ORDER_SUCCESS: return deleteOrderSuccess(state,action);
        case actionTypes.DELETE_ORDER_FAIL: return deleteOrderFail(state);
        case actionTypes.PURCHASE_INIT: return purcheseInit(state); 
        case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state);
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state,action);
        case actionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state);
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state,action);
        case actionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail(state);
        case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state);
        default: return state;
    };
};

export default reducer;