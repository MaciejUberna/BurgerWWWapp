import React from 'react';
 
import Auxiliary from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

const INGREDIENTS_TO_POLISH = {
    meat: 'mięsko',
    cheese: 'ser',
    bacon: 'bekon',
    salad: 'sałata'
}

const orderSummary = (props) => {
    const ingridientSummary = Object.keys(props.ingredients)
        .map(ingredientKey => {
            //Outer curly baraces in span are for marking a dynamic entry and inner are just javascript object
            return ( 
            <li key={ingredientKey} >
                <span style={{textTransform: "capitalize"}}>
                    {INGREDIENTS_TO_POLISH[ingredientKey]}
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
 
export default orderSummary;