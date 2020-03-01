import React, {Component} from 'react';
import queryString from 'query-string';
import CheckoutSummary from '../../coponents-stateLess/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    state = {
        ingredients: {},
        price: 0
    }

    //Maciek's way
    componentDidMount() {
        if(this.props.location.search) {
            const values = queryString.parse(this.props.location.search, {parseNumbers: true});
            const ingredients = {};
            let totalPrice = 0;
            for (let item in values) {
                if(item === 'price')
                    totalPrice = values[item];
                else
                    ingredients[item] = values[item];
            }
            this.setState({
                ingredients: ingredients,
                price: totalPrice
            });
        } else {
            console.log('Checkout.js didMount: no search history present.')
        }
    }

    //Max way
    // componentDidMount() {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     for(let param of query.entries()) {
    //         ingredients[param[0]] = +param[1];
    //     }
    //     this.setState({ingredients: ingredients});
    // }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    };

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    render() {
        //console.log('Render Checkout.js : Ingredients :: ',this.state.ingredients)
        return(
            <div>
                <CheckoutSummary ingredients={this.state.ingredients}
                checkoutCancelled={this.checkoutCancelledHandler}
                checkoutContinued={this.checkoutContinuedHandler} 
                />
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    render={(props) => 
                        (
                        <ContactData 
                            ingredients={this.state.ingredients} 
                            price={this.state.price}
                            {...props}
                            />
                        )} 
                />
            </div>
        );
    }
}

export default Checkout;