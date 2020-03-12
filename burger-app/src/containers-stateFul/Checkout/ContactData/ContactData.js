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
                    placeholder: 'imie i nazwisko'
                },
                children: '',
                value: '',
                validation: {
                    required: true,
                    regexp: '[A-ZŁ]{1}[a-złńćźżśąęó]{1,}\s{1,}[A-ZŁŚĆŹŻÓĘĄŃ]{1}[a-złńćźżśąęó]{1,}'
                },
                valid: false,
                touched: false,
                validationHelp: 'Twoje imie i nazwisko powinno zaczynać się z wielkiej litery i składać się conajmniej z jednego znaku.'
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ulica'
                },
                children: '',
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationHelp: 'Nazwa ulicy powinna zaczynać się z wielkiej litery a po nazwie powinien znajdować się numer domu i mieszkania przedzielony znakiem "/".'
            },
            postalCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'kod-pocztowy'
                },
                children: '',
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false,
                validationHelp: 'Kod pocztowy powinien składać się z niczym nie rozdzielonych 5-u cyfr.'
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'miejscowość'
                },
                children: '',
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationHelp: 'Nazwa miejscowości powinna zaczynać się z wielkiej litery.'
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'kraj'
                },
                children: '',
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationHelp: 'Nazwa kraju powinna zaczynać się z wielkiej litery.'
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'e-mail'
                },
                children: '',
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationHelp: 'Email powinien zawierać 1 znak "@" i tekst z każdej jego strony.'
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
                value: 'fastests',
                validation: {},
                valid: false
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
                value: false,
                validation: {
                    required: true
                },
                valid: false,
                validationHelp: 'Zgoda jest wymagana jeśli chcesz złożyć zamówienie.'
            },
            numberOfVisits: {
                elementType: 'radio',
                elementConfig: {
                    type: 'radio',
                    name: 'yourType',
                    options: [
                        {value: '1', text: 'Pierwszy raz'},
                        {value: '<5', text: 'Niecałe 5'},
                        {value: '>5', text: 'Powyżej 5-u razy'}
                    ]
                },
                children: 'Jak często w tygodniu korzystasz z tego serwisu?',
                value: '',
                validation: {},
                valid: false
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

    checkValidity = (value, rules) => {
        let isValid = true;
        if(rules.required) {
            if(typeof value === 'boolean')
                isValid = value;
            else
                isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;;
        }

        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;;
        }

        return isValid;
    }

    imputChangedHandler = (event, inputIdentifier) => {
        //console.log('ContactData.js, imputChangedHandler, event.tatget.value: ',event.target.value);
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
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
        updatedFormElement.touched = true;
        console.log('ContactData.js, imputChangedHandler, updatedFormElement: ',updatedFormElement);
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
                            validationHelp={formElement.config.validationHelp}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
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