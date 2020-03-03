import React from 'react';
import classes from './Order.module.css';

const EnglishToPolishIngredients = {
    meat: 'Mięsko',
    cheese: 'Ser',
    salad: 'Sałata',
    bacon: 'Bekon'
};

const order = (props) => {
    const ingredients = [];
    let ctr = 0;
    for(let key in props.ingredients){
        if(props.ingredients[key]){
            ingredients.unshift(
                <span 
                key={props.id+ctr}
                >
                    {EnglishToPolishIngredients[key]}
                    ({props.ingredients[key]}),
                </span>);
            ctr++;
        }
    }
    ingredients.push(<span key={props.id+ctr}>Bułka(1)</span>)
    return (
        <div className={classes.Order}>
            <p>Składniki: {ingredients}</p>
            <p>Cena: <strong> {Number.parseFloat(props.price.toFixed(2))} zł</strong></p>
        </div>
    )
};
export default order;