import React from 'react';
import useHttpErrorHandler from '../../hooks/http-error-handler';

import Modal from '../../coponents-stateLess/UI/Modal/Modal';
import Axiliary from '../Auxiliary/Auxiliary';

const withComponentHandler = (WrappedComponent, axios) => {
    return props => {

        const [error, clearError] = useHttpErrorHandler(axios);

        return (
                <Axiliary>
                    <Modal show={error ? true : false}
                    modalClosed={clearError}
                    >
                        {error ? error.message : null}
                    </Modal>
                    <WrappedComponent {...props}/>
                </Axiliary>
        );
    };
};

export default withComponentHandler;