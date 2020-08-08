import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import axios from '../../axios-orders';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../coponents-stateLess/Burger/Burger';
import BuildControls from '../../coponents-stateLess/Burger/BuildControls/BuildControls';
import Spinner from '../../coponents-stateLess/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import Modal from '../../coponents-stateLess/UI/Modal/Modal';
import ModalDown from '../../coponents-stateLess/UI/Modal/ModalDown';
import OrderSummary from '../../coponents-stateLess/Burger/OrderSummary/OrderSummary';
import Button from '../../coponents-stateLess/UI/Button/Button';
import { useHistory } from 'react-router-dom';

import * as actions from '../../store/actions/index';

const BurgerBuilder = props => {

    const history = useHistory();

    const goToGoogle = () => {
        history.push("/google");
    };

    const [purchaseButtonClicked,setPurchaseButtonClicked] = useState(false);

    const dispatch = useDispatch();

    const conditionsShown = useSelector(state => {
        return state.onetimeJob.responseToDisclaimer;
    });

    const ings = useSelector(state => {
        return state.burgerBuilder.ingredients;
    });

    const price = useSelector(state => {
        return state.burgerBuilder.totalPrice;
    });

    const error = useSelector(state => {
        return state.burgerBuilder.error;
    });

    const isAuthenticated = useSelector(state => {
        return state.auth.token !== null;
    });

    const onIngredientAdded = (ingName) => dispatch(actions.addIngredient(ingName));
    const onIngredientRemoved = (ingName) => dispatch(actions.removeIngredient(ingName));
    const onInitIngredients = useCallback(
        () => dispatch(actions.initIngredints()), 
        [dispatch]
        );
    const onInitPurchase = () => dispatch(actions.purchaseInit());
    const onSetAuthRedirectPath = path => dispatch(actions.setAuthRedirectPath(path));
    const disclaimerFilled = () => dispatch(actions.getDisclaimer());

    useEffect ( () => {
        //console.log('ComponentDidMount props: ',this.props);
        onInitIngredients();
    }, [onInitIngredients]);

    const updatePurchaseState = () => {

        const sum = Object.values(ings)
            .reduce((sum,element) => {
                return sum + element;
            }, 0);
        return sum > 0;
        
    };

    const purchaseHandler = () => {
        if(isAuthenticated) {
            setPurchaseButtonClicked(true);
        } else {
            onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        };
    };

    const hideRulesHandler = () => {
        disclaimerFilled();
    };

    const purchaseButtonClickedCanceledHandler = () => {
        setPurchaseButtonClicked(false);
    };

    const purchaseContinueHandler = () => {
        //Done Max way2;
        onInitPurchase();
        props.history.push('/checkout');
    };

    const disabledInfo = {
        ...ings
    };
    //console.log('-1- disableInfo: ',disabledInfo);
    for(let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
    };

    let orderSummary = null;
    let burger = error ? <p>Nie udało się załadować składników burgera.</p> : <Spinner/>;

    if(ings) {
        burger = (
            <Auxiliary>
                <Burger ingredients = {ings}/>
                <BuildControls
                    ingredientAdded={onIngredientAdded}
                    ingredientRemoved={onIngredientRemoved}
                    disabled = {disabledInfo}
                    purchasable = {updatePurchaseState()}
                    price = {price}
                    /* if purchase button clicked */
                    ordered={purchaseHandler}
                    isAuth={isAuthenticated}
                />
            </Auxiliary>
        );

        orderSummary = (
            <OrderSummary 
            ingredients={ings}
            purchaseCancelled={purchaseButtonClickedCanceledHandler}
            purchaseContinued={purchaseContinueHandler}
            price={price}
            />
        );
    }

    // useEffect(() => {
    //     console.log('conditionsNotShown: ',conditionsNotShown)
    // },[conditionsNotShown]);
    

    return (
        <Auxiliary>
            <Modal show={purchaseButtonClicked} modalClosed={purchaseButtonClickedCanceledHandler}>
                {orderSummary}
            </Modal>
            <ModalDown show={!conditionsShown}>
                <div>
                    <p>Strona używa local storege i 
                        i zapisuje informacje w bazie danych.
                        Jeśli nie wyrażasz zgody na przetwarzanie twoich
                        danych w ten sposób wybierz &nbsp;
                        <Button btnType={"Danger"}  clicked={goToGoogle}>
                            ANULUJ
                        </Button>
                        , w przeciwynym razie wybierz 
                        <Button btnType={"Success"} clicked={hideRulesHandler}>
                            OK
                        </Button>
                         .
                    </p>
                </div>
            </ModalDown>
            {burger}
        </Auxiliary>
    );  
};

export default withErrorHandler(BurgerBuilder, axios);