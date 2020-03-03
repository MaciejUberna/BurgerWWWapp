import React from 'react';
import classes from './Order.module.css';

const order = (props) => (
    <div className={classes.Order}>
        <p>Składniki: Sałata (1)</p>
        <p>Cena: <strong> 5 zł</strong></p>
    </div>
);

export default order;