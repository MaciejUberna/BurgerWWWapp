import React , { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import classes from './Orders.module.css';
import Order from '../../coponents-stateLess/Order/Order';
import * as actions from '../../store/actions/index';
import Spinner from '../../coponents-stateLess/UI/Spinner/Spinner';
import Modal from '../../coponents-stateLess/UI/Modal/Modal';
import ModalAppear from '../../coponents-stateLess/UI/Modal/ModalAppear';
import CircularModal from '../../coponents-stateLess/UI/Modal/CircuralModal';
import Input from '../../coponents-stateLess/UI/Forms/Input/Input';
import Button from '../../coponents-stateLess/UI/Button/Button';
import Burger from '../../coponents-stateLess/Burger/Burger';
import { contactsToPolish } from '../../polish-translations';
import Hoc from '../../hoc/Auxiliary/Auxiliary';
import autoValidate from '../../shared/checkValidity';

const Orders = props => {

    const [filterForm, setFilterForm] = useState({
        dateFrom: {
            elementType: 'input',
            autocomplete: 'off',
            elementConfig: {
                type: 'text',
                placeholder: 'Data od'
            },
            children: '',
            value: '',
            validation: {
                required: true,
                regexp: /^[0-9]{4}\.[0-9]{2}\.[0-9]{2}$/,
                datechck: true,
                emptyIsTrue: true
            },
            valid: false,
            touched: false,
            validationHelp: 'Podaj datę od której będą wyszukiwane zamówienia. Użyj formatu: RRRR.MM.DD'
        },
        dateTo: {
            elementType: 'input',
            autocomplete: 'off',
            elementConfig: {
                type: 'text',
                placeholder: 'Data do'
            },
            children: '',
            value: '',
            validation: {
                required: true,
                regexp: /^[0-9]{4}\.[0-9]{2}\.[0-9]{2}$/,
                datechck: true,
                emptyIsTrue: true
            },
            valid: false,
            touched: false,
            validationHelp: 'Podaj datę do której będą wyszukiwane zamówienia. Użyj formatu: RRRR.MM.DD'
        }
    });

    const [filtersFormIsValid, setFiltersFormIsValid] = useState(false);
    const [filterDateFrom,setFilterDateFrom] = useState('');
    const [filterDateTo, setFilterDateTo] = useState('');

    const {onFetchOrders, onDeleteOrder, token, userId} = props;

    const [showModalOfOrderDetails, setShowModalOfOrderDetails] = useState(false);
    const [showModalOfDeletion, setShowModalOfDeletion] = useState(false);
    const [showModalOfFilters, setShowModalOfFilters] = useState(false);
    const [filterButtonClass, setFilterButtonClass] = useState(classes.Filters);

    const [orderId, setOrderId] = useState(null);
    const [orderDetails, setOrderDetails] = useState(null);

    const [ordersFirstId, setOrdersFirstId] = useState(null);
    const [headerHeight, setHeaderHeight] = useState(1);
    const [loginHeaderHeight, setLoginHeaderHeight] = useState(1);
    const [ordersFirstHeight, setOrdersFirstHeight] = useState(1);
    const [currentCounter, setCurrentCounter] = useState(1);
    const [allItemsCounted, setAllItemsCounted] = useState(0);

    const [burgerModalShown, setBurgerModalShown] = useState(false);
    const [ingredients,setIngredients] = useState(null);
    
    useEffect( () => {
        onFetchOrders(token, userId, filterDateFrom, filterDateTo);
        //console.log('userId:',userId);
    },[onFetchOrders, onDeleteOrder , token, userId, filterDateFrom, filterDateTo]);
    
    useEffect( () => {
        //console.log('props.loading=',props.loading,' props.orders[0]=',props.orders[0]);
        if(!props.loading && props.orders[0]){
            setOrdersFirstId(props.orders[0]['id']);
            setAllItemsCounted(props.orders.length)
        };
    },[props.loading,props.orders]);

    useEffect( () => {
        //console.log('ordersFirstId::',ordersFirstId,' document.getElementById(ordersFirstId): ',document.getElementById(ordersFirstId));
        if(document.getElementById(ordersFirstId)) {
            setOrdersFirstHeight(document.getElementById(ordersFirstId).clientHeight);
            //console.log('ordersFirstHeight:: ',document.getElementById(ordersFirstId).clientHeight)
        };
        if(document.getElementById("WE358EK_header")) {
            setHeaderHeight(document.getElementById("WE358EK_header").clientHeight);
        };
        if(document.getElementById('LoginHeader1')) {
            setLoginHeaderHeight(document.getElementById('LoginHeader1').clientHeight);
        };
    },[ordersFirstId,props.orders,filterDateFrom,filterDateTo]);

    const fireOnScroll = useCallback( () => {
            if (ordersFirstHeight !== 1 && !showModalOfFilters) {
                const st = window.pageYOffset || document.documentElement.scrollTop;
                const displayCapacity = Math.floor((window.innerHeight-headerHeight-loginHeaderHeight)/ordersFirstHeight);
                let intermediateCalc = Math.round(st/ordersFirstHeight)+displayCapacity;
                //console.log('st: '+st);
                //console.log('displayCapacity: ',displayCapacity)
                //console.log('ordersFirstHeight: '+ordersFirstHeight)
                //console.log('intermediate calc: '+intermediateCalc);
                //console.log('location: '+window.location.pathname);
                if (intermediateCalc > allItemsCounted)
                    intermediateCalc = allItemsCounted;
                setCurrentCounter(intermediateCalc);
            }
    },[ordersFirstHeight, allItemsCounted, headerHeight,loginHeaderHeight, showModalOfFilters]);

    useEffect(() => {

        const root = document.compatMode === 'BackCompat' ? document.body : document.documentElement;
        if(root.scrollHeight > root.clientHeight) {
            window.addEventListener('scroll',fireOnScroll,false);
        } else {
            setCurrentCounter(allItemsCounted);
        }
        //console.log('Added scroll listener.');

        return () => {
            window.removeEventListener('scroll', fireOnScroll);
            //console.log('Removed scroll listener.')
        }

    },[fireOnScroll, allItemsCounted])

    const performDeletionHandler = () => {
        onDeleteOrder(token,orderId,userId);
        setShowModalOfDeletion(false);
    };

    const showBurgerModalHandler = (ingredients) => {
        setBurgerModalShown(true);
        setIngredients(ingredients);
    }

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

    const filterModalHandler = () => {
        const state = !showModalOfFilters
        setShowModalOfFilters(s => !s);
        let startAt = (filterDateFrom === '' ? false : true);
        let endAt = (filterDateTo === '' ? false : true);
        
        for(let formElementIndentifier in filterForm) {
            switch(formElementIndentifier) {
                case 'dateFrom':
                    if(filterForm[formElementIndentifier].valid) {
                        if(filterForm[formElementIndentifier].value !== '') {
                            setFilterDateFrom(filterForm[formElementIndentifier].value+' 00:00:00.000');
                            startAt = true;
                        } else {
                            setFilterDateFrom('');
                            startAt = false;
                        };
                    } else {
                        //startAt = false;
                    };
                break;
                case 'dateTo':
                    if(filterForm[formElementIndentifier].valid) {
                        if(filterForm[formElementIndentifier].value !== '') {
                            setFilterDateTo(filterForm[formElementIndentifier].value+' 00:00:00.000');
                            endAt = true;
                        } else {
                            setFilterDateTo('');
                            endAt = false;
                        };
                    } else {
                        //endAt = false;
                    };
                break;
                default:
                    console.log('Unknown Filter: '+formElementIndentifier+' : '+filterForm[formElementIndentifier].value); 
            };
        };

        if(state) {
            setFilterButtonClass([classes.Filters, classes.EditFilters].join(' '));
        } else {
            // console.log('satrtAt: ',startAt);
            // console.log('endAt: ',endAt);
            // console.log('filterDateFrom: ',filterDateFrom);
            // console.log('filterDateTo: ',filterDateTo);
            if( startAt || endAt ) {
                // console.log('Engaged!');
                setFilterButtonClass([classes.Filters, classes.EngagedFilters].join(' '));
            } else
                setFilterButtonClass(classes.Filters);
        };
    };

    const filterHandler = (event) => {
        event.preventDefault();
        filterModalHandler();
    }

    const imputChangedHandler = (event, inputIdentifier) => {
        const updatedFilterForm = {
            ...filterForm
        };
        const updatedFormElement = {
            ...updatedFilterForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = autoValidate(updatedFormElement.value,updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedFilterForm[inputIdentifier] = updatedFormElement;

        let formValid = true;
        for(let key in updatedFilterForm){
            if(updatedFilterForm[key].touched === true && updatedFilterForm[key].value !== '')
                formValid = updatedFilterForm[key].valid && formValid;
        }
        //console.log('FormIsValid? :: ',formIsValid);
        setFilterForm(updatedFilterForm);
        setFiltersFormIsValid(formValid);
    }

    const formElementsArray = [];
    for(let key in filterForm) {
    formElementsArray.push({
            id: key,
            config: filterForm[key]
        })
    }
    let form = (
        <form onSubmit={filterHandler}>
            {formElementsArray.map(formElement => {
                return (
                    <Input
                        key={formElement.id}
                        id={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        autocomplete={formElement.config.autocomplete}
                        children={formElement.config.children}
                        validationHelp={formElement.config.validationHelp}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => imputChangedHandler(event,formElement.id)}
                        displayRules={props.showRules}
                    />
                );
            })}
            <Button btnType='Success' disabled={!filtersFormIsValid}>Użyj filtrów</Button>
        </form>
    );

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
                    showBurger={showBurgerModalHandler.bind(this,o.ingredients)}
                />;
            })
        );
    };

    return (
        <div id='X2XF4'>
            <CircularModal show={showModalOfFilters}>
                {form}
            </CircularModal>
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
            <ModalAppear show={burgerModalShown} modalClosed={setBurgerModalShown.bind(this,false)}>
                {ingredients ? <Burger burgerType="BurgerOrder" ingredients={ingredients}/> : null}
            </ModalAppear>
            <h3 
                className={classes.Login}
                id="LoginHeader1"
            >
                Zalogowano na: {props.login}
                <br/>
                <p className={filterButtonClass} onClick={filterModalHandler}>Filtry</p>
            </h3>
            {orders}
            <p className={classes.Counter}>{currentCounter}/{allItemsCounted}</p>
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
        onFetchOrders: (token,userId,startAt,endAt) => dispatch(actions.fetchOrders(token,userId,startAt,endAt)),
        onDeleteOrder: (token,orderId,userId) => dispatch(actions.deleteOrder(token,orderId,userId))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));