import React from 'react';
 
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem';
 
const navigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            {/* For bulien variables we just have to write variable name without value so it's true */}
            <NavigationItem link="/" active>Burger Builder</NavigationItem>
            <NavigationItem link="/" >Checkout</NavigationItem>
        </ul>
    );
}
 
export default navigationItems;