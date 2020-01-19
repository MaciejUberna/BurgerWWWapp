import React from 'react';

import classes from './DrawerToggle.module.css'
 
const menu = (props) => {
    return (
        <div className={classes.DrawerToggle} onClick={props.clicked}>
            MENU
        </div>
    );
}
 
export default menu;