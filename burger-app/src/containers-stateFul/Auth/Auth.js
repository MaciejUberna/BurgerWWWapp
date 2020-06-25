import React , { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../coponents-stateLess/UI/Forms/Input/Input';
import Button from '../../coponents-stateLess/UI/Button/Button';
import Spinner from '../../coponents-stateLess/UI/Spinner/Spinner'; 
import autoValidation from '../../shared/checkValidity';
import Modal from '../../coponents-stateLess/UI/Modal/Modal';
import { terms } from '../../regulations/terms-of-use';

import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';

// Firebase rest auth:
// https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password

const Auth = props => {
    const [showModal, setShowModal] = useState(false);

    const [authForm, setAuthForm] = useState({
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
            },
            termsOfUse: {
                elementType: 'checkbox',
                elementConfig: {
                    type: 'checkbox',
                    name: 'terms',
                    value: 'checked',
                    id: 'terms'
                },
                children: 'Przystajesz na `REGULAMIN` korzystania z serwisu.',
                value: false,
                validation: {
                    required: true,
                    regexp: /^(Tak)$/
                },
                valid: false,
                validationHelp: 'Zgoda jest wymagana jeśli chcesz korzystać z dema servisu.'
            }
        });

    const [isSignUp, setIsSignUp] = useState(true);

    const [formIsValid,setFormIsValid] = useState(false);

    const {buildingBurger,authRedirectPath,onSetAuthRedirectPath} = props;

    useEffect( () => {
        if(!buildingBurger && authRedirectPath !== '/')
            onSetAuthRedirectPath();
    },[buildingBurger,authRedirectPath,onSetAuthRedirectPath]);

    const imputChangedHandler = (event, controlName) => {
        let value = event.target.value;
        if (controlName === 'termsOfUse') {
            if (event.target.checked) 
                value = 'Tak';
            else
                value = 'Nie';
        }
        const updatedControls = {
            ...authForm,
            [controlName]: {
                ...authForm[controlName],
                value: value,
                valid: autoValidation(event.target.value,authForm[controlName].validation),
                touched: true
            }
        };
        setAuthForm(updatedControls);
        setTotalFormValidity(updatedControls);
    };

    const setTotalFormValidity = (controls) => {
        let totalValidity = true;
        for(let key in controls) {
            totalValidity = controls[key].valid && totalValidity;
        }
        setFormIsValid(totalValidity);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(authForm.email.value,authForm.password.value,isSignUp);
    };

    const switchAuthModeHandler = () => {
        setIsSignUp(!isSignUp);
    };

    const formElementsArray = [];
    for(let key in authForm) {
        formElementsArray.push({
            id: key,
            config: authForm[key] 
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
            changed={(event) => imputChangedHandler(event,f.id)}
            displayRules={setShowModal.bind(this,true)}
        />
    ));

    if (props.loading) {
        form = <Spinner/>;
    };

    let errorMessage = null;

    if(props.error) {
        errorMessage = (<p id={classes.ErrorMessage}>{props.error.message}</p>)
    };

    let authRedirect = null;
    if(props.isAuthenticated) {
        authRedirect = <Redirect to={props.authRedirectPath}/>;
    }

    return (
        <div className={classes.Auth}>
            {authRedirect}
            {errorMessage}
            <Modal show={showModal} modalClosed={setShowModal.bind(this,false)}>
                    { terms }
                    <center>
                        <Button 
                            btnType="Success" 
                            clicked={setShowModal.bind(this,false)}
                        >
                            OK
                        </Button>
                    </center>
                </Modal>
            <form onSubmit={submitHandler}>
                {form}
                <Button disabled={!formIsValid} btnType="Success">Wyślij</Button>
            </form>
            <Button 
                clicked={switchAuthModeHandler}
                btnType="Danger">
                    Zmień na 
                    {!isSignUp 
                    ? 
                    ' Zarejestruj się' 
                    : ' Zaloguj'}
            </Button>
        </div>
    );

};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Auth);