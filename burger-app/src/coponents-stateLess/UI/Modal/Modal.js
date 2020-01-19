import React from 'react';
import PropTypes from 'prop-types';
import classes from './Modal.module.css'

import Auxiliary from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';
 
const modal = (props) => { 
    return (
        <Auxiliary>
            <Backdrop show={props.show} clicked={props.modalClosed}/>
            <div className={classes.Modal}
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}
            >
                {props.children}
            </div>
        </Auxiliary>
    );
}

modal.propTypes = {
    children: PropTypes.object.isRequired,
    show: PropTypes.bool.isRequired,
    clicked: PropTypes.func
};
 
export default modal;