import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './Modal.module.css'

import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

//Alternative i reactMemo wrap
class Modal extends Component { 

    //We are not using PureComponent because it will do too many checks
    shouldComponentUpdate(nextProps,nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    componentDidUpdate() {
        //console.log('[Modal] updated.')
    }

    render() {
        return (
            <Auxiliary>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div className={classes.Modal}
                style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '0'
                }}
                >
                    {this.props.children}
                </div>
            </Auxiliary>
        );
    }
}

Modal.propTypes = {
    show: PropTypes.bool.isRequired,
    clicked: PropTypes.func
};
 
export default Modal;