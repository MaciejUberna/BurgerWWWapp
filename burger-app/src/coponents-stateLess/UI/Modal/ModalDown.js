import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import classes from './ModalDown.module.css'

import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';

const ModalDown = props => { 

    //We are not using PureComponent because it will do too many checks
    // shouldComponentUpdate(nextProps,nextState) {
    //     return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    // }

    const objRef = useRef(null);
    const [modalHeight, setModalHeight] = useState(0);
    const [windowHeight, setWindowHeight] = useState(0);
    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        if(objRef.current.offsetHeight)
            setModalHeight(objRef.current.offsetHeight);
    },[objRef,windowHeight,windowWidth]);

    useEffect(() => {
        window.addEventListener('resize', updateWindowDimension);

        return () => {
            window.removeEventListener('resize',updateWindowDimension);
        }
    },[]);

    const updateWindowDimension = () => {
        setWindowHeight(window.innerHeight);
        setWindowWidth(window.innerWidth);
    }

    return (
        <Auxiliary>
            <div className={classes.Modal} ref={objRef}
            style={{
                transform: props.show 
                ? 
                `translateY(${-(modalHeight+3)}px)`
                : 
                `translateY(${modalHeight}px)`,
                opacity: props.show ? '.9' : '0'
            }}
            >
                {props.children}
            </div>
        </Auxiliary>
    );
};

ModalDown.propTypes = {
    show: PropTypes.bool.isRequired,
    clicked: PropTypes.func
};
 
export default React.memo(ModalDown,(prevProps, nextProps) => 
    nextProps.show === prevProps.show && 
    nextProps.children === prevProps.children
);