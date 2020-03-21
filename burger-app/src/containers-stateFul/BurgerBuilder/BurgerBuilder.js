import React, { Component } from 'react';
import { connect } from 'react-redux';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../coponents-stateLess/Burger/Burger';
import BuildControls from '../../coponents-stateLess/Burger/BuildControls/BuildControls';
import Spinner from '../../coponents-stateLess/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import Modal from '../../coponents-stateLess/UI/Modal/Modal';
import OrderSummary from '../../coponents-stateLess/Burger/OrderSummary/OrderSummary';

import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
    // constructor (props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        purchaseButtonClicked: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        console.log('ComponentDidMount props: ',this.props);
        // axios.get('https://maciej-my-burger.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         console.log('Ingredients feached from database: ',response)
        //         this.setState({ingredients: response.data});
        //     })
        //     .catch(error => {
        //         this.setState({error: true});
        //     });
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
        this.setState({purchaseButtonClicked: true});
    };

    purchaseButtonClickedCanceledHandler = () => {
        this.setState({purchaseButtonClicked: false});
    };

    purchaseContinueHandler = () => {
        //Done Max way2;
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
        let burger = this.state.error ? <p>Nie udało się załadować składników burgera.</p> : <Spinner/>;

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

        if (this.state.loading) {
            orderSummary = <Spinner/>;
        };
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
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT,ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT,ingredientName: ingName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));