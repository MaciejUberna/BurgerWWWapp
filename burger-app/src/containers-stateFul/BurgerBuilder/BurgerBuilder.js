import React, { Component } from "react";
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../coponents-stateLess/Burger/Burger';
import BuildControls from '../../coponents-stateLess/Burger/BuildControls/BuildControls';
import Spinner from '../../coponents-stateLess/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import Modal from '../../coponents-stateLess/UI/Modal/Modal';
import OrderSummary from '../../coponents-stateLess/Burger/OrderSummary/OrderSummary';

import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    salad: 1,
    cheese: 2,
    meat: 4,
    bacon: 2.7
};

class BurgerBuilder extends Component {
    // constructor (props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 5,
        purchasable: false,
        purchaseButtonClicked: false,
        loading: false
    }

    componentDidUpdate () {
        //console.log(this.state);
    }

    addIngredientHandler = (type) => {
        // const oldCount = this.state.ingredients[type];
        // const updatedCount = oldCount + 1;
        // const updatedIngredients = {
        //     ...this.state.ingredients
        // };
        // updatedIngredients[type] = updatedCount;
        // const priceAddition = INGREDIENT_PRICES[type];
        // const oldPrice = this.state.totalPrice;
        // const newPrice = oldPrice + priceAddition;
        // this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        // this.updatePurchaseState(updatedIngredients);

        this.setState(prevState => ({
            totalPrice: prevState.totalPrice + INGREDIENT_PRICES[type],
            ingredients: {
                ...prevState.ingredients,
                [type]: prevState.ingredients[type] + 1
            }
        }), this.updatePurchaseState );
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount > 0) {
            // const updatedCount = oldCount - 1;
            // const updatedIngredients = {
            //     ...this.state.ingredients
            // };
            // updatedIngredients[type] = updatedCount;
            // const oldPrice = this.state.totalPrice;
            // const priceSubstraction = INGREDIENT_PRICES[type];
            // const newPrice = oldPrice - priceSubstraction;
            // this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
            // this.updatePurchaseState(updatedIngredients);

            this.setState(prevState => ({
                totalPrice: prevState.totalPrice - INGREDIENT_PRICES[type],
                ingredients: {
                    ...prevState.ingredients,
                    [type]: prevState.ingredients[type] - 1
                }
            }), this.updatePurchaseState );
        }
    };

    updatePurchaseState = (updatedIngredients) => {
        //Creates an array with string entris "meat", "bacon" and so on...
        // const sum = Object.keys(updatedIngredients)
        //     //Map ingredients
        //     .map(ingredientKey => {
        //         return updatedIngredients[ingredientKey]
        //     })
        //     //sum ap all elements
        //     .reduce((sum,element) => {
        //         return sum + element;
        //     }, 0);
        //     this.setState({purchasable: sum > 0});

        const sum = Object.values(this.state.ingredients)
            .reduce((sum,element) => {
                return sum + element;
            }, 0);
        this.setState({purchasable: sum > 0});
    };

    purchaseHandler = () => {
        this.setState({purchaseButtonClicked: true});
    };

    purchaseButtonClickedCanceledHandler = () => {
        this.setState({purchaseButtonClicked: false});
    };

    purchaseContinueHandler = () => {
        // alert('Wybrałeś kontynuację!');
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Maciej',
                address: {
                    street: 'InfineteLoopStreet 1',
                    zipCode: '99-999',
                    country: 'Poland'
                },
                email: 'test1@test.com'
            },
            deliveryMethod: 'fastests'
        };

        //for firebase its .json node
        axios.post('/orders.json',order)
            .then(response => {
                this.setState({loading: false, purchaseButtonClicked: false});
                console.log('Response to order: ',response)
            })
            .catch(error => {
                this.setState({loading: false, purchaseButtonClicked: false});
                console.log('Response to order error: ',error)
            });
    };
    
    render () {
        const disabledInfo = {
            ...this.state.ingredients
        }
        //console.log('-1- disableInfo: ',disabledInfo);
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        };
        let orderSummary = (
            <OrderSummary 
            ingredients={this.state.ingredients}
            purchaseCancelled={this.purchaseButtonClickedCanceledHandler}
            purchaseContinued={this.purchaseContinueHandler}
            price={this.state.totalPrice}
            />
        );
        if (this.state.loading) {
            orderSummary = <Spinner/>;
        };
        //console.log('-2- disableInfo: ',disabledInfo);
        return (
            <Auxiliary>
                <Modal show={this.state.purchaseButtonClicked} modalClosed={this.purchaseButtonClickedCanceledHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients = {this.state.ingredients}/>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled = {disabledInfo}
                    purchasable = {this.state.purchasable}
                    price = {this.state.totalPrice}
                    /* if purchase button clicked */
                    ordered={this.purchaseHandler}
                />
            </Auxiliary>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);