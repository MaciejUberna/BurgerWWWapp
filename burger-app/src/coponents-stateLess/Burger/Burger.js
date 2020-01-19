import React from 'react';
import PropTypes from 'prop-types';
import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
 
const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
    .map(ingredientKey => {
        return [...Array(props.ingredients[ingredientKey])].map((_,i) => {
            return <BurgerIngredient key={ingredientKey + i} type={ingredientKey}/>
        });
    })
    .reduce((array,element) => {
        return array.concat(element);
    }, []);

    //console.log(transformedIngredients);

    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Zacznij wprowadzać składniki.</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

burger.propTypes = {
    ingredients: PropTypes.object.isRequired
};
 
export default burger;