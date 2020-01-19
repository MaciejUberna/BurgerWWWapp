import React, { Component } from 'react';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';
import PropTypes from 'prop-types';

const INGREDIENTS_TO_POLISH = {
    meat: 'mięsko',
    cheese: 'ser',
    bacon: 'bekon',
    salad: 'sałata'
}

class OrderSummary  extends Component {

    //This could be a functional component, doesn't nave to be a class
    componentDidUpdate() {
        console.log('[OrderSummary] did update');
    }

    render() {
        const ingridientSummary = Object.keys(this.props.ingredients)
            .map(ingredientKey => {
                //Outer curly baraces in span are for marking a dynamic entry and inner are just javascript object
                return ( 
                <li key={ingredientKey} >
                    <span style={{textTransform: "capitalize"}}>
                        {INGREDIENTS_TO_POLISH[ingredientKey]}
                    </span> 
                    : {this.props.ingredients[ingredientKey]}
                </li>
                )
            });
        
        return(
            <Auxiliary>
                <h3>Twoje Zamówienie</h3>
                <p>Smaczny hamburger z super składnikami: </p>
                <ul>
                    {ingridientSummary}
                </ul>
                {/* <p>Continue checkout?</p> */}
                <p><strong>Ostateczna cena: {this.props.price.toFixed(2)} zł.</strong></p>
                <p>Przejść Dalej?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>ANULUJ</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>DALEJ</Button>
            </Auxiliary>
        );
    }
}

OrderSummary.propTypes = {
    ingredients: PropTypes.object,
    price: PropTypes.number.isRequired,
    purchaseCancelled: PropTypes.func.isRequired,
    purchaseContinued: PropTypes.func.isRequired
}
 
export default OrderSummary;