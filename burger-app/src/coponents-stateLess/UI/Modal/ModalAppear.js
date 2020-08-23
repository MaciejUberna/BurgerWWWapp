import React from 'react';
import PropTypes from 'prop-types';
import classes from './ModalAppear.module.css'

import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

const ModalAppear = props => { 

    return (
        <Auxiliary>
            <Backdrop show={props.show} clicked={props.modalClosed}/>
            <div className={classes.ModalAppear}
            onClick={props.modalClosed}
            style={{
                opacity: props.show ? '1' : '0',
                zIndex: props.show ? '100' : -2
            }}
            >
                {props.children}
            </div>
        </Auxiliary>
    );
};

ModalAppear.propTypes = {
    show: PropTypes.bool.isRequired,
    clicked: PropTypes.func
};
 
export default React.memo(ModalAppear,(prevProps, nextProps) => 
    nextProps.show === prevProps.show && 
    nextProps.children === prevProps.children
);