import React, {Component} from 'react';
import queryString from 'query-string';
import CheckoutSummary from '../../coponents-stateLess/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {

    state = {
        ingredients: {}
    }

    componentDidMount() {
        if(this.props.location.search) {
            const values = queryString.parse(this.props.location.search, {parseNumbers: true});
            this.setState({ingredients: values});
        } else {
            console.log('Checkout.js didMount: no search history present.')
        }
    }

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
            </div>
        );
    }
}

export default Checkout;