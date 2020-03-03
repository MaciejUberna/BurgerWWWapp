import React, {Component} from 'react';
import Button from '../../../coponents-stateLess/UI/Button/Button';
import Spinner from '../../../coponents-stateLess/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Input from '../../../coponents-stateLess/UI/Forms/Input/Input';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: '',
            city: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        //console.log('ingredients in ContactData: ',this.props.ingredients);

        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Maciej',
                address: {
                    street: 'InfineteLoopStreet 1',
                    postalCode: '99-999',
                    city: 'Warsaw'
                },
                email: 'test1@test.com'
            },
            deliveryMethod: 'fastests'
        };

        //for firebase its .json node
        axios.post('/orders.json',order)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push('/');
                console.log('Response to order: ',response)
            })
            .catch(error => {
                this.setState({loading: false});
                console.log('Response to order error: ',error)
            });
    }

    render () {
        let form = (
            <form>
                <Input inputtype='input' type='text' name='name' placeholder='Twoje Imie' />
                <Input inputtype='input' type='email' name='email' placeholder='Twój email' />
                <Input inputtype='input' type='text' name='street' placeholder='Twoja ulica' />
                <Input inputtype='input' type='text' name='postalCode' placeholder='kod-pocztowy' />
                <Input inputtype='input' type='text' name='city' placeholder='miasto' />
                <Button btnType='Success' clicked={this.orderHandler}>Zamówienie</Button>
            </form>
        );
        if(this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Wprowadź swoje dane kontaktowe</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;