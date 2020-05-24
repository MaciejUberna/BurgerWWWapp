import React , { useEffect } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Order from '../../coponents-stateLess/Order/Order';
import * as actions from '../../store/actions/index';
import Spinner from '../../coponents-stateLess/UI/Spinner/Spinner';

const Orders = props => {

    useEffect( () => {
        props.onFetchOrders(props.token, props.userId);
    },[props]);

    let orders = null;
    if(props.loading)
        orders = (<Spinner/>);
    else {
        orders = (
            props.orders.map(o => {
                return <Order 
                    key={o.id}
                    ingredients={o.ingredients}
                    price={o.price}
                    id={o.id}
                />;
            })
        );
    };
    return (
        <div>
            {orders}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        //see the rootReduser to underestand it
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token,userId) => dispatch(actions.fetchOrders(token,userId))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));