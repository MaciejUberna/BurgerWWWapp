import React from 'react';

import Modal from '../../coponents-stateLess/UI/Modal/Modal';
import Axiliary from '../Auxiliary/Auxiliary';

const withComponentHandler = (WrappedComponent) => {
    return (props) => {
        return (
            <Axiliary>
                <Modal show>
                    Coś się skiepściło...
                </Modal>
                <WrappedComponent {...props}/>
            </Axiliary>
        );
    };
};

export default withComponentHandler;