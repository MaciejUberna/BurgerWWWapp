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
        totalPrice: 5,
        purchasable: false
    }

    componentDidUpdate () {
        console.log(this.state);
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);

        // this.setState(prevState => ({
        //     totalPrice: prevState.totalPrice + INGREDIENT_PRICES[type],
        //     ingredients: {
        //         ...prevState.ingredients,
        //         [type]: prevState.ingredients[type] + 1
        //     }
        // }), this.updatePurchaseState );
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount > 0) {
            const updatedCount = oldCount - 1;
            const updatedIngredients = {
                ...this.state.ingredients
            };
            updatedIngredients[type] = updatedCount;
            const oldPrice = this.state.totalPrice;
            const priceSubstraction = INGREDIENT_PRICES[type];
            const newPrice = oldPrice - priceSubstraction;
            this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
            this.updatePurchaseState(updatedIngredients);

            // this.setState(prevState => ({
            //     totalPrice: prevState.totalPrice - INGREDIENT_PRICES[type],
            //     ingredients: {
            //         ...prevState.ingredients,
            //         [type]: prevState.ingredients[type] - 1
            //     }
            // }), this.updatePurchaseState );
        }
    }

    updatePurchaseState = (updatedIngredients) => {
        const ingredients = {
            ...updatedIngredients
        }
        //Creates an array with string entris "meat", "bacon" and so on...
        const sum = Object.keys(ingredients)
            //Map ingredients
            .map(ingredientKey => {
                return ingredients[ingredientKey]
            })
            //sum ap all elements
            .reduce((sum,element) => {
                return sum + element;
            }, 0);
            this.setState({purchasable: sum > 0});
    }
    
    render () {
        const disabledInfo = {
            ...this.state.ingredients
        }
        console.log('-1- disableInfo: ',disabledInfo);
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        console.log('-2- disableInfo: ',disabledInfo);
        return (
            <Auxiliary>
                <Burger ingredients = {this.state.ingredients}/>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled = {disabledInfo}
                    purchasable = {this.state.purchasable}
                    price = {this.state.totalPrice}
                />
            </Auxiliary>
        );
    }
}

export default BurgerBuilder;