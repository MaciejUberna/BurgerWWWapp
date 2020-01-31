import React from 'react';
import classes from './Spinner.module.css';

//From: https://projects.lukehaas.me/css-loaders/

const spinner = () => {
    return (
        <div className={classes.Loader}>Loading...</div>
    );
};

export default spinner;