import React , { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../coponents-stateLess/UI/Forms/Input/Input';
import Button from '../../coponents-stateLess/UI/Button/Button';
import Spinner from '../../coponents-stateLess/UI/Spinner/Spinner';

import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';

// Firebase rest auth:
// https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'E-mail adres'
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
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Hasło'
                },
                children: '',
                value: '',
                validation: {
                    required: true,
                    regexp: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,24})/
                },
                valid: false,
                touched: false,
                validationHelp: 'Hasło bez polskich znaków, powinno się składać conajmniej z jednaj małej litery, jednej dużej litery, z cyfry, a długość hasła min 8 znaków max 24 znaki.'
            }
        },
        isSignUp: true,
        formIsValid: false
    };

    checkValidity = (value, rules) => {
        let isValid = true;
        if(!rules) 
            return true;
        if(rules.required) {
            if(typeof value === 'boolean')
                isValid = value;
            else
                isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        if(rules.regexp) {
            //console.log('value.match(rules.regexp): ',value.match(rules.regexp))
            isValid = rules.regexp.test(value) && isValid;
        }

        return isValid;
    };

    imputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value,this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({controls: updatedControls});
        this.setTotalFormValidity(updatedControls);
    };

    setTotalFormValidity = (controls) => {
        let totalValidity = true;
        for(let key in controls) {
            totalValidity = controls[key].valid && totalValidity;
        }
        this.setState({formIsValid: totalValidity});
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignUp);
    };

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignUp: !prevState.isSignUp}
        });
    };

    render() {
        const formElementsArray = [];
        for(let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key] 
            });
        }

        let form = formElementsArray.map(f => (
            <Input
                key={f.id}
                elementType={f.config.elementType}
                elementConfig={f.config.elementConfig}
                value={f.config.value}
                children={f.config.children}
                validationHelp={f.config.validationHelp}
                invalid={!f.config.valid}
                shouldValidate={f.config.validation}
                touched={f.config.touched}
                changed={(event) => this.imputChangedHandler(event,f.id)}
            />
        ));

        if (this.props.loading) {
            form = <Spinner/>;
        };

        let errorMessage = null;

        if(this.props.error) {
            errorMessage = (<p id={classes.ErrorMessage}>{this.props.error.message}</p>)
        };

        return (
            <div className={classes.Auth}>
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button disabled={!this.state.formIsValid} btnType="Success">Wyślij</Button>
                </form>
                <Button 
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger">
                        Zmień na 
                        {!this.state.isSignUp 
                        ? 
                        ' Zarejestruj się' 
                        : ' Zaloguj'}
                </Button>
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Auth);