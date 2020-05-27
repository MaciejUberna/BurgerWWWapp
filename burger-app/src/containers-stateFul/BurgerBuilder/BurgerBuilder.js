import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../coponents-stateLess/Burger/Burger';
import BuildControls from '../../coponents-stateLess/Burger/BuildControls/BuildControls';
import Spinner from '../../coponents-stateLess/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import Modal from '../../coponents-stateLess/UI/Modal/Modal';
import OrderSummary from '../../coponents-stateLess/Burger/OrderSummary/OrderSummary';

import * as actions from '../../store/actions/index';

const BurgerBuilder = props => {

    const [purchaseButtonClicked,setPurchaseButtonClicked] = useState(false);

    useEffect ( () => {
        //console.log('ComponentDidMount props: ',this.props);
        props.onInitIngredients();
    }, []);

    const updatePurchaseState = () => {

        const sum = Object.values(props.ings)
            .reduce((sum,element) => {
                return sum + element;
            }, 0);
        return sum > 0;
        
    };

    const purchaseHandler = () => {
        if(props.isAuthenticated) {
            setPurchaseButtonClicked(true);
        } else {
            props.onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        };
    };

    const purchaseButtonClickedCanceledHandler = () => {
        setPurchaseButtonClicked(false);
    };

    const purchaseContinueHandler = () => {
        //Done Max way2;
        props.onInitPurchase();
        props.history.push('/checkout');
    };

    const disabledInfo = {
        ...props.ings
    }
    //console.log('-1- disableInfo: ',disabledInfo);
    for(let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
    };

    let orderSummary = null;
    let burger = props.error ? <p>Nie udało się załadować składników burgera.</p> : <Spinner/>;

    if(props.ings) {
        burger = (
            <Auxiliary>
                <Burger ingredients = {props.ings}/>
                <BuildControls
                    ingredientAdded={props.onIngredientAdded}
                    ingredientRemoved={props.onIngredientRemoved}
                    disabled = {disabledInfo}
                    purchasable = {updatePurchaseState()}
                    price = {props.price}
                    /* if purchase button clicked */
                    ordered={purchaseHandler}
                    isAuth={props.isAuthenticated}
                />
            </Auxiliary>
        );

        orderSummary = (
            <OrderSummary 
            ingredients={props.ings}
            purchaseCancelled={purchaseButtonClickedCanceledHandler}
            purchaseContinued={purchaseContinueHandler}
            price={props.price}
            />
        );
    }

    //console.log('-2- disableInfo: ',disabledInfo);
    return (
        <Auxiliary>
            <Modal show={purchaseButtonClicked} modalClosed={purchaseButtonClickedCanceledHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Auxiliary>
    );  
};

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredints()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));