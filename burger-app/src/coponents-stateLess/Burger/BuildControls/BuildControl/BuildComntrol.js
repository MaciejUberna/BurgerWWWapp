import React from 'react';
 
import classes from './BuildControl.module.css'
 
const buildControl = (props) => {
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.ingredientLabel}</div>
            <button className={classes.Less} onClick={props.removed} disabled={props.disabled}>
                Odejmij
            </button>
            <button className={classes.More} onClick={props.added}>
                Dodaj
            </button>
        </div>
    );
}
 
export default buildControl;