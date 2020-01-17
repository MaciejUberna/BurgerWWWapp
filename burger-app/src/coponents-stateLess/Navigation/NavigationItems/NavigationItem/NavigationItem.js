import React from 'react';
import classes from './NavigationItem.module.css'
 
const navigationItem = (props) => {
    return (
        <li className={classes.NavigationItem}>
            <a
                classNamne={props.active ? classes.active : null}
                href={props.link} 
                className={}>
                {props.children}
            </a>
        </li>
    );
}
 
export default navigationItem;