import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxiliary from '../../../hoc/Auxiliary';

import PropTypes from 'prop-types';

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <Auxiliary>
        <Backdrop show={props.open} clicked={props.closed}/>
        <div className={attachedClasses.join(' ')}>
            <div className={classes.Logo}>
                <Logo/>
            </div>
            <nav>
                <NavigationItems/>
            </nav>
        </div>
        </Auxiliary>
    );
}

sideDrawer.propTypes = {
    open: PropTypes.bool.isRequired,
    closed: PropTypes.func.isRequired
};
 
export default sideDrawer;