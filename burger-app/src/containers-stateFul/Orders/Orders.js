import React , { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import classes from './Orders.module.css';
import Order from '../../coponents-stateLess/Order/Order';
import * as actions from '../../store/actions/index';
import Spinner from '../../coponents-stateLess/UI/Spinner/Spinner';
import Modal from '../../coponents-stateLess/UI/Modal/Modal';
import Button from '../../coponents-stateLess/UI/Button/Button';
import { contactsToPolish } from '../../polish-translations';
import Hoc from '../../hoc/Auxiliary/Auxiliary';

const Orders = props => {

    const {onFetchOrders, token, userId} = props;

    const [showModalOfOrderDetails, setShowModalOfOrderDetails] = useState(false);
    const [showModalOfDeletion, setShowModalOfDeletion] = useState(false);

    const [orderId, setOrderId] = useState(null);
    const [orderDetails, setOrderDetails] = useState(null);

    
    const performDeletionHandler = () => {
        //here we should send deletion request and reload orders page.
        //right now we just close modal
        onFetchOrders(token, userId);
        setShowModalOfDeletion(false);
    };

    useEffect( () => {
        onFetchOrders(token, userId);
    },[onFetchOrders, token, userId]);

    const toggleOrderDetailsModal = (detailsObject) => {
        const details = [];

        for(let key in detailsObject) {
            if(contactsToPolish[key])
                details.push(
                    <Hoc key={key}>
                        <p>{contactsToPolish[key]}&nbsp;:&nbsp;{detailsObject[key]}</p>
                        <hr></hr>
                    </Hoc>
            );
        };
        setOrderDetails(details);
        setShowModalOfOrderDetails(true);
    };

    const toggleDeleteOrderModal = (id) => {
        setOrderId(id);
        setShowModalOfDeletion(true);
    };

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
                    orderDetails={toggleOrderDetailsModal.bind(this,o.orderData)}
                    deleteOrder={toggleDeleteOrderModal.bind(this,o.id)}
                />;
            })
        );
    };



    return (
        <div>
            <Modal show={showModalOfOrderDetails} modalClosed={setShowModalOfOrderDetails.bind(this,false)}>
                {orderDetails}
                <center><Button btnType="Success" clicked={setShowModalOfOrderDetails.bind(this,false)}> OK </Button></center>
            </Modal>
            <Modal show={showModalOfDeletion} modalClosed={setShowModalOfDeletion.bind(this,false)}>
                <center>
                    <p>Czy na pewno chcesz usunąć to zamówienie?</p>
                    <Button btnType="Success" clicked={setShowModalOfDeletion.bind(this,false)}> Anuluj </Button>
                    <Button btnType="Danger" clicked={performDeletionHandler}> Usuń </Button>
                </center>
            </Modal>
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