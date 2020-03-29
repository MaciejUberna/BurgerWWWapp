import React from 'react';
 
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem';
 
const navigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            {/* For bulien variables we just have to write variable name without value so it's true */}
            <NavigationItem link="/" exact>Kreator Burgera</NavigationItem>
            <NavigationItem link="/orders" >Zamówienia</NavigationItem>
            <NavigationItem link="/auth" >Logowanie</NavigationItem>
        </ul>
    );
}
 
export default navigationItems;