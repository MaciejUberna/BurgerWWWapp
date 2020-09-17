import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import { CSSTransition } from 'react-transition-group';

import './CircuralModal.css';

const CircuralModal = props => { 

    const [circularAnimation,setCircularAnimation] = useState(false)
    const [formAnimation, setFormAnimation] = useState(false);

    useEffect(() => {
        if(props.show) {
            setCircularAnimation(true);
            setFormAnimation(false);
        } else {
            setFormAnimation(false);
        }
    },[props.show]);

    return (
        <Auxiliary>
            <CSSTransition
                in={circularAnimation} 
                timeout={800}
                classNames={{
                    enter: 'CircuralModal-enter',
                    enterActive: 'CircuralModal-enter-active',
                    enterDone: 'CircuralModal-enter-done',
                    exit: 'CircuralModal-exit',
                    exitActive: 'CircuralModal-exit-active',
                    exitDone: 'CircuralModal-exit-done'
                    // this below is used when animation is played for the first time
                    // appear: '',
                    // appearActive: ''
    
                }}
                mountOnEnter
                unmountOnExit
                onEnter={() => {
                            //console.log('onEnter');
                        }}
                onEntering={() => {
                            //console.log('onEntering');
                        }}
                onEntered={
                            () => {
                                //console.log('onEntered');
                                setFormAnimation(true);
                            }
                        }
                onExit={
                        () => {
                            //console.log('onExit');
                            //setFormAnimation(true)
                            
                        }}
                onExiting={() => {
                            //console.log('onExiting');
                        }}
                onExited={() => {
                            //console.log('onExited');
                            //setFormAnimation(false);
                        }}
            >
                <div className="CircuralModal"></div>
            </CSSTransition>
            <CSSTransition
                in={formAnimation} 
                timeout={800}
                classNames={{
                    enter: '.Form-enter',
                    enterActive: 'Form-enter-active',
                    enterDone: 'Form-enter-done',
                    exit: 'Form-exit',
                    exitActive: 'Form-exit-active',
                    exitDone: 'Form-exit-done'
                    // this below is used when animation is played for the first time
                    // appear: 'CircuralModal-enter',
                    // appearActive: 'CircuralModal-enter-active'
                    // appearDone: ''
                }}
                mountOnEnter
                unmountOnExit
                onEnter={() => { 
                            //console.log('onEnter');
                        }}
                onEntering={() => {
                            //console.log('onEntering');
                        }}
                onEntered={
                            () => {
                                //console.log('onEntered');
                            }
                        }
                onExit={
                        () => {
                            //console.log('onExit');
                        }}
                onExiting={() => {
                            //console.log('onExiting');
                        }}
                onExited={() => {
                            //console.log('onExited');
                            setCircularAnimation(false);
                        }}
            >
                <div className="Form">
                    {props.children}
                </div>
            </CSSTransition>
        </Auxiliary>
    );
};

CircuralModal.propTypes = {
    show: PropTypes.bool.isRequired,
    clicked: PropTypes.func
};
 
export default React.memo(CircuralModal,(prevProps, nextProps) => 
    nextProps.show === prevProps.show && 
    nextProps.children === prevProps.children
);