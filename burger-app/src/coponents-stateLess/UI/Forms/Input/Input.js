import React from 'react';
import classes from './Input.module.css';

const input = ( props) => {

    let inputElement = null;

    switch ( props.inputtype ) {
        case ('input'):
            inputElement = <input className={classes.InputElement} {...props}/>;
        break;
        case ('textarea'):
            inputElement = <textarea className={classes.InputElement} {...props}/>;
        break;
        default:
            console.err('[E]Error form validation: Input.js, switch statement.')
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default input;