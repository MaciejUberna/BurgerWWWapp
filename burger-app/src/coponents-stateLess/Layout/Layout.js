import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    render () {
        return (
        <Auxiliary>
            <Toolbar/>
            <SideDrawer/>
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Auxiliary>
        );
    };
};

export default Layout;

