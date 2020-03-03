import React, {Component} from 'react';
import Button from '../../../coponents-stateLess/UI/Button/Button';
import Spinner from '../../../coponents-stateLess/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Input from '../../../coponents-stateLess/UI/Forms/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'imie'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ulica'
                },
                value: ''
            },
            postalCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'kod-pocztowy'
                },
                value: ''
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'miejscowość'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'kraj'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'e-mail'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    option: [
                        {value: 'fastests', displayValue: 'Najszybsza'},
                        {value: 'cheapest', displayValue: 'Najtańsza'}
                    ]
                },
                value: ''
            },
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
                <Input elementType='...' elementConfig='...' value='...'/>
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