import React from 'react';
import PropTypes from 'prop-types';
import classes from './Modal.module.css'

import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

//Alternative i reactMemo wrap
const Modal = props => { 

    //We are not using PureComponent because it will do too many checks
    // shouldComponentUpdate(nextProps,nextState) {
    //     return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    // }

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
};

Modal.propTypes = {
    show: PropTypes.bool.isRequired,
    clicked: PropTypes.func
};
 
export default React.memo(Modal,(prevProps, nextProps) => 
    nextProps.show === prevProps.show && 
    nextProps.children === prevProps.children
);