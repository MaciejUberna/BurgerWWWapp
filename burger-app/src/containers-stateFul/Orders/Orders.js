import React , { useEffect } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import classes from './Orders.module.css';
import Order from '../../coponents-stateLess/Order/Order';
import * as actions from '../../store/actions/index';
import Spinner from '../../coponents-stateLess/UI/Spinner/Spinner';

const Orders = props => {

    const {onFetchOrders, token, userId} = props;

    useEffect( () => {
        onFetchOrders(token, userId);
    },[onFetchOrders, token, userId]);

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
            <h3 className={classes.Login}>Zamówienia użytkownika: "{props.login}"</h3>
            <p><br/><br/></p>
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
        userId: state.auth.userId,
        login: state.auth.login
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token,userId) => dispatch(actions.fetchOrders(token,userId))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));