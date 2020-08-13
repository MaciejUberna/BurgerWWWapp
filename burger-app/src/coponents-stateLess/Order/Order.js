import React from 'react';
import classes from './Order.module.css';
import Button from '../UI/Button/Button';
import { ingredientsToPolish } from '../../polish-translations';

const order = (props) => {
    const ingredients = [];
    let ctr = 0;
    for(let key in props.ingredients){
        if(props.ingredients[key]){
            ingredients.unshift(
                <span 
                key={props.id+ctr}
                >
                    {ingredientsToPolish[key]}
                    ({props.ingredients[key]}),
                </span>);
            ctr++;
        }
    }
    ingredients.push(<span key={props.id+ctr}>Bułka(1)</span>)
    return (
        <div className={classes.Order} id={props.id}>
            <p>Danie: Burger</p>
            <p>Data utworzenia: {props.dateOfOrder}</p>
            <p>Składniki: {ingredients}</p>
            <p>Cena: <strong> {props.price} zł</strong></p>
            <p> 
                <Button btnType="Success" clicked={props.orderDetails}>Dane dostawy</Button> 
                    &nbsp; 
                <Button btnType="Danger" clicked={props.deleteOrder}>Usuń</Button> 
            </p>
        </div>
    )
};
export default order;