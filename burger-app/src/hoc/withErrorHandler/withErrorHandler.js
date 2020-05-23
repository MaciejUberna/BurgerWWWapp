import React, { useState, useEffect } from 'react';

import Modal from '../../coponents-stateLess/UI/Modal/Modal';
import Axiliary from '../Auxiliary/Auxiliary';

const withComponentHandler = (WrappedComponent, axios) => {
    return props => {

        const [error, setError] = useState(null);

        const reqInterceptor = axios.interceptors.request.use(req => {
            setError(null);
            return req;
        });

        const resInterceptor = axios.interceptors.response.use(response => response, err => {
            setError(err);
        });

        //Prevents memory licks when component is not needed anymore
        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(reqInterceptor);
                axios.interceptors.response.eject(resInterceptor);
            };
        },[reqInterceptor,resInterceptor]);

        const errorConfirmedHandler = () => {
            setError(null);
        };

        return (
                <Axiliary>
                    <Modal show={error ? true : false}
                    modalClosed={errorConfirmedHandler}
                    >
                        {error ? error.message : null}
                    </Modal>
                    <WrappedComponent {...props}/>
                </Axiliary>
        );
    };
};

export default withComponentHandler;