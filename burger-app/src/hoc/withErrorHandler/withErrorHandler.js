import React, { Component } from 'react';

import Modal from '../../coponents-stateLess/UI/Modal/Modal';
import Axiliary from '../Auxiliary/Auxiliary';

const withComponentHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error: null,
            reqInterceptor: null,
            resInterceptor: null
        };

        constructor(props) {
            super(props);
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(response => response, error => {
                this.setState({error: error})
            });
        };

        //Prevents memory licks when component is not needed anymore
        componentWillUnmount () {
            console.log('Will Unmount: req::',this.reqInterceptor,' res::',this.resInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        };

        errorConfirmedHandler = () => {
            this.setState({error: null})
        };

        render () {
            return (
                <Axiliary>
                    <Modal show={this.state.error ? true : false}
                    modalClosed={this.errorConfirmedHandler}
                    >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Axiliary>
            );
        }
    };
};

export default withComponentHandler;