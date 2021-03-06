import React, {Component} from 'react';
import Button from '../../../coponents-stateLess/UI/Button/Button';
import Spinner from '../../../coponents-stateLess/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import { connect } from 'react-redux';

import Input from '../../../coponents-stateLess/UI/Forms/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import autoValidate from '../../../shared/checkValidity';

// use https://validatejs.org/ to validete forms in production
// new ideas for validation
// react-validation package: https://www.npmjs.com/package/react-validation
// formsy-react package: https://github.com/christianalfoni/formsy-react

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'imię i nazwisko'
                },
                children: '',
                value: '',
                validation: {
                    required: true,
                    regexp: /^[A-ZŁ]{1}[a-złńćźżśąęó]{1,}\s{1,}[A-ZŁŚĆŹŻÓĘĄŃ]{1}[a-złńćźżśąęó]{1,}$/
                },
                valid: false,
                touched: false,
                validationHelp: 'Twoje imię i nazwisko powinno zaczynać się z wielkiej litery i składać się conajmniej z jednego znaku.'
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
                    required: true,
                    regexp: /^[A-ZŁŚĆŹŻÓĘĄŃ]{1}[a-złńćźżśąęó]{1,}\s{1,}\d{1,}[a-z]*\/\d{1,}$/
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
                    regexp: /^\d{5}$/
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
                    required: true,
                    regexp: /^[A-ZŁŚĆŹŻÓĘĄ]{1}[a-złńćźżśąęó]{1,}(\s{1,}[A-ZŁŚĆŹŻÓĘĄ]{1}[a-złńćźżśąęó]{1,})*$/
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
                    required: true,
                    regexp: /^[A-ZŁŚĆŹŻÓĘĄ]{1}[a-złńćźżśąęó]{1,}(\s{1,}[A-ZŁŚĆŹŻÓĘĄ]{1}[a-złńćźżśąęó]{1,})*$/
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
                    required: true,
                    regexp: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:+)\])/
                },
                valid: false,
                touched: false,
                validationHelp: 'Email powinien zawierać 1 znak "@" i tekst z cyframi z każdej jego strony.'
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
                valid: true
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
                        {value: '5', text: 'Równo 5 razy'},
                        {value: '>5', text: 'Więcej niż 5 razy'}
                    ]
                },
                children: 'Jak często w tygodniu korzystasz z tego serwisu?',
                value: '',
                validation: {
                    required: true
                },
                valid: false
            }
        },
        formIsValid: false,
    }

    //I dont want to send request automatically because that would reload my page
    //That is why I preventDefault.
    orderHandler = (event) => {
        event.preventDefault();
        //console.log('ingredients in ContactData: ',this.props.ingredients);

        const formData = {};
        for(let formElementIndentifier in this.state.orderForm) {
            formData[formElementIndentifier] = this.state.orderForm[formElementIndentifier].value;
        }
        const order = {
            userId: this.props.userId,
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
        };

        this.props.onOrderBurger(order,this.props.token);

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
        updatedFormElement.valid = autoValidate(updatedFormElement.value,updatedFormElement.validation);
        updatedFormElement.touched = true;
        //console.log('ContactData.js, imputChangedHandler, updatedFormElement: ',updatedFormElement);
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for(let key in updatedOrderForm){
            formIsValid = updatedOrderForm[key].valid && formIsValid;
        }
        //console.log('FormIsValid? :: ',formIsValid);
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
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
                <Button btnType='Success' disabled={!this.state.formIsValid}>Zamówienie</Button>
            </form>
        );
        if(this.props.loading) {
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

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));