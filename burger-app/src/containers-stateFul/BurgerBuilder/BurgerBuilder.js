import React, { Component } from 'react';
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

class BurgerBuilder extends Component {
    // constructor (props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        purchaseButtonClicked: false
    }

    componentDidMount () {
        //console.log('ComponentDidMount props: ',this.props);
        this.props.onInitIngredints();
    }

    componentDidUpdate () {
        //console.log('Did update: ',this.state);
    }

    updatePurchaseState = () => {

        const sum = Object.values(this.props.ings)
            .reduce((sum,element) => {
                return sum + element;
            }, 0);
        return sum > 0;
        
    };

    purchaseHandler = () => {
        if(this.props.isAuthenticated) {
            this.setState({purchaseButtonClicked: true});
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    };

    purchaseButtonClickedCanceledHandler = () => {
        this.setState({purchaseButtonClicked: false});
    };

    purchaseContinueHandler = () => {
        //Done Max way2;
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    };
    
    render () {
        const disabledInfo = {
            ...this.props.ings
        }
        //console.log('-1- disableInfo: ',disabledInfo);
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        };

        let orderSummary = null;
        let burger = this.props.error ? <p>Nie udało się załadować składników burgera.</p> : <Spinner/>;

        if(this.props.ings) {
            burger = (
                <Auxiliary>
                    <Burger ingredients = {this.props.ings}/>
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled = {disabledInfo}
                        purchasable = {this.updatePurchaseState()}
                        price = {this.props.price}
                        /* if purchase button clicked */
                        ordered={this.purchaseHandler}
                        isAuth={this.props.isAuthenticated}
                    />
                </Auxiliary>
            );

            orderSummary = (
                <OrderSummary 
                ingredients={this.props.ings}
                purchaseCancelled={this.purchaseButtonClickedCanceledHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.props.price}
                />
            );
        }

        //console.log('-2- disableInfo: ',disabledInfo);
        return (
            <Auxiliary>
                <Modal show={this.state.purchaseButtonClicked} modalClosed={this.purchaseButtonClickedCanceledHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        );
    }
}

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
        onInitIngredints: () => dispatch(actions.initIngredints()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));