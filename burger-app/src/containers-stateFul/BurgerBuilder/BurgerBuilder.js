import React, { Component } from "react";
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../coponents-stateLess/Burger/Burger';
import BuildControls from '../../coponents-stateLess/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 1,
    cheese: 2,
    meat: 4,
    bacon: 2.7
}

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
        totalPrice: 5
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
        this.setState(prevState => ({
            totalPrice: prevState.totalPrice + INGREDIENT_PRICES[type],
            ingredients: {
                ...prevState.ingredients,
                [type]: prevState.ingredients[type] + 1
            }
        }));
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
            this.setState(prevState => ({
                totalPrice: prevState.totalPrice - INGREDIENT_PRICES[type],
                ingredients: {
                    ...prevState.ingredients,
                    [type]: prevState.ingredients[type] - 1
                }
            }));
        }
    }
    
    render () {
        
        return (
            <Auxiliary>
                <Burger ingredients = {this.state.ingredients}/>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                />
            </Auxiliary>
        );
    }
}

export default BurgerBuilder;