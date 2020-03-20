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

//For feaching the data best place is componentDidMount
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
        totalPrice: 5,
        purchasable: false,
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

            // this.setState(prevState => ({
            //     totalPrice: prevState.totalPrice - INGREDIENT_PRICES[type],
            //     ingredients: {
            //         ...prevState.ingredients,
            //         [type]: prevState.ingredients[type] - 1
            //     }
            // }), this.updatePurchaseState );
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
        // this.setState({loading: true});
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Maciej',
        //         address: {
        //             street: 'InfineteLoopStreet 1',
        //             zipCode: '99-999',
        //             country: 'Poland'
        //         },
        //         email: 'test1@test.com'
        //     },
        //     deliveryMethod: 'fastests'
        // };

        // //for firebase its .json node
        // axios.post('/orders.json',order)
        //     .then(response => {
        //         this.setState({loading: false, purchaseButtonClicked: false});
        //         console.log('Response to order: ',response)
        //     })
        //     .catch(error => {
        //         this.setState({loading: false, purchaseButtonClicked: false});
        //         console.log('Response to order error: ',error)
        //     });
       

        //Done Max way:
        const queryParams = [];
        for(let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '='
            + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price='+this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
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
                        purchasable = {this.state.purchasable}
                        price = {this.state.totalPrice}
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
                price={this.state.totalPrice}
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
        ings: state.ingredients
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT,ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT,ingredientName: ingName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));