import React from 'react';
import classes from './BurgerIngredient.module.css';

//Props should hold info which burger ingredient to render
const burgerIngredient = (props) => {
    let ingredient = null;

    switch (props.type) {
        case ('bread-bottom'):
            ingredient = <div className = {classes.BreadBottom}></div>;
            break;
        case ('bread-top'):
            ingredient = (
                <div className = {classes.BreadTop}>
                    <div className = {classes.Seeds1}></div>
                    <div className = {classes.Seeds2}></div>
                </div>
            );
            break;
        case ('meat'):
            ingredient = <div className = {classes.Meat}></div>
            break;
        case ('chease'):
            ingredient = <div className = {classes.Cheese}></div>
            break;
        case ('salad'):
            ingredient = <div className = {classes.Salad}></div>
            break;
        case ('bacon'):
            ingredient = <div className = {classes.Bacon}></div>
            break;
        default:
                console.error("[E] unknown ingredient ",props.type," provided!");
    }

    return ingredient;
};

export default burgerIngredient;