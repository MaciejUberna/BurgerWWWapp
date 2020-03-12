import React from 'react';
import PropTypes from 'prop-types';
 
import classes from './Button.module.css'
 
const button = (props) => {
    return (
        <button 
        disabled={props.disabled}
        className={[classes.Button, classes[props.btnType]].join(' ')} 
        onClick={props.clicked}>
            {props.children}
        </button>
    );
}

button.propTypes = {
    children: PropTypes.string.isRequired,
    btnType: PropTypes.string.isRequired,
};
 
export default button;

