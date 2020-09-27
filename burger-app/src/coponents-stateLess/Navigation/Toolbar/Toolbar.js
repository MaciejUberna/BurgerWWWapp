import React from 'react';
import PropTypes from 'prop-types';
import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
 
const toolbar = (props) => {
    return (
        <header id="WE358EK_header" className={classes.Toolbar}>
            <DrawerToggle clicked={props.drawerToggleClicked}/>
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav className={classes.DesktopOnly}>
                <NavigationItems isAuthenticated={props.isAuth}/>
            </nav>
        </header>
    );
}

toolbar.propTypes = {
    drawerToggleClicked: PropTypes.func.isRequired
};
 
export default toolbar;