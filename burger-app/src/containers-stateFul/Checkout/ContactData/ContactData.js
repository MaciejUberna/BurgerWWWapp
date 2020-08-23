import React, { useState } from 'react';
import Button from '../../../coponents-stateLess/UI/Button/Button';
import Spinner from '../../../coponents-stateLess/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import { connect } from 'react-redux';
import { countries, compare } from '../../../Locale/countries';

import Input from '../../../coponents-stateLess/UI/Forms/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import autoValidate from '../../../shared/checkValidity';

// use https://validatejs.org/ to validete forms in production
// new ideas for validation
// react-validation package: https://www.npmjs.com/package/react-validation
// formsy-react package: https://github.com/christianalfoni/formsy-react

const ContactData = props => {

    const [orderForm, setOrderForm] = useState({
        name: {
            elementType: 'input',
            autocomplete: 'off',
            elementConfig: {
                type: 'text',
                placeholder: 'Imię i nazwisko'
            },
            children: '',
            value: '',
            validation: {
                required: true,
                regexp: /^[A-ZŁŻ]{1}[a-złńćźżśąęó]{1,}\s{1,}[A-ZŁŚĆŹŻÓĘĄŃ]{1}[a-złńćźżśąęó]{1,}(([A-ZŁŚĆŹŻÓĘĄŃ]{1}[a-złńćźżśąęó]{1,})|([-\s]{1}[A-ZŁŚĆŹŻÓĘĄŃ]{1}[a-złńćźżśąęó]{1,}))*$/
            },
            valid: false,
            touched: false,
            validationHelp: 'Twoje imię i nazwisko powinno zaczynać się z wielkiej litery.'
        },
        street: {
            elementType: 'input',
            autocomplete: 'off',
            elementConfig: {
                type: 'text',
                placeholder: 'Adres'
            },
            children: '',
            value: '',
            validation: {
                required: true,
                regexp: /^([A-ZŁŚĆŹŻÓĘĄŃ]{1}[a-złńćźżśąęó]{1,})(\s[A-ZŁŚĆŹŻÓĘĄŃ]{1}[a-złńćźżśąęó]{1,})*\s{1,}\d{1,}[a-z]*\/\d{1,}$/
            },
            valid: false,
            touched: false,
            validationHelp: 'Nazwa ulicy powinna zaczynać się z wielkiej litery a po nazwie powinien znajdować się numer domu i mieszkania przedzielony znakiem "/".'
        },
        postalCode: {
            elementType: 'input',
            autocomplete: 'off',
            elementConfig: {
                type: 'text',
                placeholder: 'Kod pocztowy'
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
            autocomplete: 'off',
            elementConfig: {
                type: 'text',
                placeholder: 'Miejscowość'
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
            elementType: 'select',
            elementConfig: {
                options: countries.sort(compare),
                placeholder: 'Kraj dostawy'
            },
            children: '',
            value: 'Poland',
            validation: {},
            valid: true
        },
        telephone: {
            elementType: 'input',
            autocomplete: 'off',
            elementConfig: {
                type: 'text',
                placeholder: 'Telefon'
            },
            children: '',
            value: '',
            validation: {
                required: true,
                regexp: /^([0-9]{1})(\s{0,1})([0-9]{1})(\s{0,1})([0-9]{1})(\s{0,1})([0-9]{1})(\s{0,1})([0-9]{1})(\s{0,1})([0-9]{1})(\s{0,1})([0-9]{1})(\s{0,1})([0-9]{1})(\s{0,1})([0-9]{1})$/
            },
            valid: false,
            touched: false,
            validationHelp: 'Wprowadź 9 cyfr.'
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    {value: 'fastests', displayValue: 'Najszybsza'},
                    {value: 'cheapest', displayValue: 'Najtańsza'}
                ],
                placeholder: 'Metoda dostawy'
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
                id: 'terms'
            },
            children: 'Przystajesz na `REGULAMIN` świadczenia usługi.',
            value: false,
            validation: {
                required: true,
                regexp: /^(Tak)$/
            },
            valid: false,
            validationHelp: 'Zgoda jest wymagana jeśli chcesz złożyć zamówienie.'
        },
        numberOfVisits: {
            elementType: 'radio',
            elementConfig: {
                type: 'radio',
                name: 'odwiedziny',
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
                required: false
            },
            valid: true,
            validationHelp: ''
        }
    });

    const [formIsValid, setFormIsValid] = useState(false);

    const getDateString = (date) => {
        let month = date.getMonth()+1;
        if (month < 10) month = `0${month}`;
        let dayOfMonth = date.getDate();
        if(dayOfMonth < 10) dayOfMonth = `0${dayOfMonth}`;
        let hours = date.getHours();
        if (hours < 10) hours = `0${hours}`;
        let minutes = date.getMinutes();
        if (minutes < 10) minutes = `0${minutes}`;
        let seconds = date.getSeconds();
        if (seconds < 10) seconds = `0${seconds}`;
        let milliseconds = date.getMilliseconds();
        if (milliseconds < 10)
            milliseconds = `00${milliseconds}`;
        else if ( milliseconds < 100)
            milliseconds = `0${milliseconds}`;
        return `${date.getFullYear()}.${month}.${dayOfMonth} ${hours}:${minutes}:${seconds}.${milliseconds}`;
    }

    //I dont want to send request automatically because that would reload my page
    //That is why I preventDefault.
    const orderHandler = (event) => {
        event.preventDefault();
        //console.log('ingredients in ContactData: ',props.ingredients);

        const formData = {};
        formData['email'] = props.login;
        for(let formElementIndentifier in orderForm) {
            formData[formElementIndentifier] = orderForm[formElementIndentifier].value;
            //console.log(formElementIndentifier+' : '+orderForm[formElementIndentifier].value);
        }
        const date = new Date();
        const order = {
            // userId: props.userId,
            dateOfOrder: getDateString(date),
            ingredients: props.ings,
            price: props.price.toFixed(2),
            orderData: formData
        };

        props.onOrderBurger(order,props.token,props.userId);

    }

    const imputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        if(updatedFormElement.elementType==='checkbox') {
            if(!event.target.checked)
                updatedFormElement.value = 'Tak';
            else
                updatedFormElement.value = 'Nie';
        } else
            updatedFormElement.value = event.target.value;
        updatedFormElement.valid = autoValidate(updatedFormElement.value,updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formValid = true;
        for(let key in updatedOrderForm){
            formValid = updatedOrderForm[key].valid && formValid;
        }
        //console.log('FormIsValid? :: ',formIsValid);
        setOrderForm(updatedOrderForm);
        setFormIsValid(formValid);
    }

    const formElementsArray = [];
    for(let key in orderForm) {
    formElementsArray.push({
            id: key,
            config: orderForm[key]
        })
    }
    let form = (
        <form onSubmit={orderHandler}>
            {formElementsArray.map(formElement => {
                return (
                    <Input
                        key={formElement.id}
                        id={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        autocomplete={formElement.config.autocomplete}
                        children={formElement.config.children}
                        validationHelp={formElement.config.validationHelp}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => imputChangedHandler(event,formElement.id)}
                        displayRules={props.showRules}
                    />
                );
            })}
            <Button btnType='Success' disabled={!formIsValid}>Zamówienie</Button>
        </form>
    );
    if(props.loading) {
        form = <Spinner />;
    }
    return (
        <div>
            <div className={classes.ContactData}>
                <h4>Wprowadź swoje dane kontaktowe</h4>
                {form}
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId,
        login: state.auth.login
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token, userId) => dispatch(actions.purchaseBurger(orderData, token, userId))
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));