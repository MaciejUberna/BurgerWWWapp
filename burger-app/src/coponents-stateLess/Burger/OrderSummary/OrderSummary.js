import React from 'react';
 
import Auxiliary from '../../../hoc/Auxiliary';

const orderSummary = (props) => {
    const ingridientSummary = Object.keys(props.ingredients)
        .map(ingredientKey => {
            //Outer curly baraces in span are for marking a dynamic entry and inner are just javascript object
            return ( 
            <li>
                <span style={{textTransform: "capitalize"}}>
                    {ingredientKey}
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
            <p>Przejść Dalej?</p>
        </Auxiliary>
    );
}
 
export default orderSummary;