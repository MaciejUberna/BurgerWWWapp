import React , { Component } from 'react';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Order from '../../coponents-stateLess/Order/Order';

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                const orders = [];
                for(let key in res.data) {
                    orders.unshift({
                        ...res.data[key],
                        id: key
                    });
                }
                console.log('Orders, componentDidMount, response: ',res);
                this.setState({
                    loading: false,
                    orders: orders
                });
            })
            .catch(err => {
                this.setState({loading: false});
                console.log('Orders, componentDidMount, error: ',err);
            })
    }

    render () {
        return (
            <div>
                <Order />
                <Order />
            </div>
        );
    }
}

export default withErrorHandler(Orders,axios);