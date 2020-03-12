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
                children: '',
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ulica'
                },
                children: '',
                value: ''
            },
            postalCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'kod-pocztowy'
                },
                children: '',
                value: ''
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'miejscowość'
                },
                children: '',
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'kraj'
                },
                children: '',
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'e-mail'
                },
                children: '',
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastests', displayValue: 'Najszybsza'},
                        {value: 'cheapest', displayValue: 'Najtańsza'}
                    ]
                },
                children: '',
                value: ''
            },
            buyTerms: {
                elementType: 'checkbox',
                elementConfig: {
                    type: 'checkbox',
                    name: 'terms',
                    value: 'checked',
                    id: 'terms',
                },
                children: 'Przystajesz na REGULAMIN świadczenia usługi.',
                value: false
            },
            sex: {
                elementType: 'radio',
                elementConfig: {
                    type: 'radio',
                    name: 'yourType',
                    options: [
                        {value: '1', text: 'Pierwszy raz'},
                        {value: '<10', text: 'Niecałe 10'},
                        {value: '>10', text: 'Powyżej 10-u razy'}
                    ]
                },
                children: 'Jak często korzystasz z tego serwisu?',
                value: ''
            }
        },
        loading: false
    }

    //I dont want to send request automatically because that would reload my page
    //That is why I preventDefault.
    orderHandler = (event) => {
        event.preventDefault();
        //console.log('ingredients in ContactData: ',this.props.ingredients);

        this.setState({loading: true});
        const formData = {};
        for(let formElementIndentifier in this.state.orderForm) {
            formData[formElementIndentifier] = this.state.orderForm[formElementIndentifier].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
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

    imputChangedHandler = (event, inputIdentifier) => {
        console.log('ContactData.js, imputChangedHandler, event.tatget.value: ',event.target.value);
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        if(updatedFormElement.elementType==='checkbox')
            updatedFormElement.value = event.target.checked;
        else
            updatedFormElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({orderForm: updatedOrderForm});
    }

    render () {
        const formElementsArray = [];
        for(let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => {
                    return (
                        <Input
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            children={formElement.config.children}
                            changed={(event) => this.imputChangedHandler(event,formElement.id)}
                        />
                    );
                })}
                <Button btnType='Success' >Zamówienie</Button>
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