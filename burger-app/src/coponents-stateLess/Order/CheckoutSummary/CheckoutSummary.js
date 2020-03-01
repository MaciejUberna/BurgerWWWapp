import React from 'react';
import classes from './CheckoutSummary.module.css';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const checkoutSummary = (props) => {

    return (
        <div className={classes.CheckoutSummary}>
            <h1>Smacznego !</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnType="Danger"
            clicked={props.checkoutCancelled}>
                &#8592; Anuluj
            </Button>
            <Button btnType="Success"
            clicked={props.checkoutContinued}>
                Dalej &#8594;
            </Button>
        </div>
    );
}

export default checkoutSummary;