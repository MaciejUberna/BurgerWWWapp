import React from 'react';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';
import PropTypes from 'prop-types';
import { ingredientsToPolish } from '../../../polish-translations';

const OrderSummary  = props => {

    const ingridientSummary = Object.keys(props.ingredients)
        .map(ingredientKey => {
            //Outer curly baraces in span are for marking a dynamic entry and inner are just javascript object
            return ( 
            <li key={ingredientKey} >
                <span style={{textTransform: "capitalize"}}>
                    {ingredientsToPolish[ingredientKey]}
                </span> 
                : {props.ingredients[ingredientKey]}
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
            <p><strong>Ostateczna cena: {props.price.toFixed(2)} zł.</strong></p>
            <p>Przejść Dalej?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>ANULUJ</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>DALEJ</Button>
        </Auxiliary>
    );
}

OrderSummary.propTypes = {
    ingredients: PropTypes.object,
    price: PropTypes.number.isRequired,
    purchaseCancelled: PropTypes.func.isRequired,
    purchaseContinued: PropTypes.func.isRequired
}
 
export default OrderSummary;