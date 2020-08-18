import React , { useState, useEffect, useCallback } from 'react';
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

    const {onFetchOrders, onDeleteOrder, token, userId} = props;

    const [showModalOfOrderDetails, setShowModalOfOrderDetails] = useState(false);
    const [showModalOfDeletion, setShowModalOfDeletion] = useState(false);

    const [orderId, setOrderId] = useState(null);
    const [orderDetails, setOrderDetails] = useState(null);

    const [ordersFirstId, setOrdersFirstId] = useState(null);
    const [ordersFirstHeight, setOrdersFirstHeight] = useState(1);
    const [currentCounter, setCurrentCounter] = useState(1);
    const [allItemsLength, setAllItemsLength] = useState(0);
    
    useEffect( () => {
        onFetchOrders(token, userId);
        //console.log('userId:',userId);
    },[onFetchOrders, onDeleteOrder , token, userId]);
    
    useEffect( () => {
        //console.log('props.loading=',props.loading,' props.orders[0]=',props.orders[0]);
        if(!props.loading && props.orders[0]){
            setOrdersFirstId(props.orders[0]['id']);
            setAllItemsLength(props.orders.length)
        };
    },[props.loading,props.orders]);

    useEffect( () => {
        //console.log('ordersFirstId::',ordersFirstId,' document.getElementById(ordersFirstId): ',document.getElementById(ordersFirstId));
        if(document.getElementById(ordersFirstId)) {
            setOrdersFirstHeight(document.getElementById(ordersFirstId).clientHeight);
            //console.log('ordersFirstHeight:: ',ordersFirstHeight)
        };
    },[ordersFirstId,props.orders]);

    const fireOnScroll = useCallback( () => {
            if (ordersFirstHeight !== 1) {
                const st = window.pageYOffset || document.documentElement.scrollTop;
                const displayCapacity = Math.floor(window.innerHeight/ordersFirstHeight);
                let intermediateCalc = Math.round(st/ordersFirstHeight)+displayCapacity;
                //console.log('st: '+st);
                //console.log('ordersFirstHeight: '+ordersFirstHeight)
                //console.log('intermediate calc: '+intermediateCalc);
                //console.log('location: '+window.location.pathname);
                if (intermediateCalc > allItemsLength)
                    intermediateCalc = allItemsLength;
                setCurrentCounter(intermediateCalc);
            }
    },[ordersFirstHeight,allItemsLength]);

    useEffect(() => {

        window.addEventListener('scroll',fireOnScroll,false);
        //console.log('Added scroll listener.');

        return () => {
            window.removeEventListener('scroll', fireOnScroll);
            //console.log('Removed scroll listener.')
        }

    },[fireOnScroll])

    const performDeletionHandler = () => {
        onDeleteOrder(token,orderId,userId);
        setShowModalOfDeletion(false);
    };

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
                    dateOfOrder={o.dateOfOrder}
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
        <div id='X2XF4'>
            <Modal show={showModalOfOrderDetails} modalClosed={setShowModalOfOrderDetails.bind(this,false)}>
                <div className={classes.Details}>
                    {orderDetails}
                </div>
                <center><Button btnType="Success" clicked={setShowModalOfOrderDetails.bind(this,false)}> OK </Button></center>
            </Modal>
            <Modal show={showModalOfDeletion} modalClosed={setShowModalOfDeletion.bind(this,false)}>
                <center>
                    <p>Czy na pewno chcesz usunąć to zamówienie?</p>
                    <Button btnType="Success" clicked={setShowModalOfDeletion.bind(this,false)}> Anuluj </Button>
                    <Button btnType="Danger" clicked={performDeletionHandler}> Usuń </Button>
                </center>
            </Modal>
            <h3 className={classes.Login}>Zalogowano na: {props.login}</h3>
            <p><br/><br/></p>
            {orders}
            <p className={classes.Counter}> {currentCounter}/{allItemsLength}</p>
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
        onFetchOrders: (token,userId) => dispatch(actions.fetchOrders(token,userId)),
        onDeleteOrder: (token,orderId,userId) => dispatch(actions.deleteOrder(token,orderId,userId))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));