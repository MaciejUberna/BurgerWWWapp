import React, { Component } from 'react';

import Modal from '../../coponents-stateLess/UI/Modal/Modal';
import Axiliary from '../Auxiliary/Auxiliary';

const withComponentHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error: null
        };

        constructor() {
            super();
            axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            axios.interceptors.response.use(response => response, error => {
                this.setState({error: error})
            });
        }

        errorConfirmedHandler = () => {
            this.setState({error: null})
        }

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